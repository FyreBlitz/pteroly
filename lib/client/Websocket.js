"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketClient = exports.Socket = void 0;
var events_1 = require("events");
var ws_1 = require("ws");
var Socket = /** @class */ (function () {
    function Socket(url, options) {
        var _this = this;
        this.url = url;
        this.options = options;
        this.reconnectNum = 0;
        this.open = function () {
            var options = _this.options;
            var reconnect = _this.reconnect;
            _this.ws = new ws_1.WebSocket(_this.url);
            _this.ws.onmessage = options.onmessage;
            var onOpen = options.onopen.bind(_this);
            _this.ws.onopen = function (e) {
                onOpen(e);
                _this.reconnectNum = 0;
            };
            var onClose = options.onclose.bind(_this);
            _this.ws.onclose = function (e) {
                e.code === 1e3 || e.code === 1001 || e.code === 1005 || reconnect(e);
                onClose(e);
            };
            var onError = options.onerror.bind(_this);
            _this.ws.onerror = function (e) {
                e && e.code === 'ECONNREFUSED'
                    ? reconnect(e)
                    : onError(e);
            };
        };
        this.reconnect = function (e) {
            var onReconnect = _this.options.onreconnect.bind(_this);
            var onMaximum = _this.options.onmaximum.bind(_this);
            var open = _this.open;
            if (_this.timer && _this.reconnectNum++ < Infinity) {
                _this.timer = setTimeout(function () {
                    onReconnect(e);
                    open();
                }, 1e3);
            }
            else {
                onMaximum(e);
            }
        };
        this.json = function (x) {
            _this.ws.send(JSON.stringify(x));
        };
        this.send = function (x) {
            _this.ws.send(x);
        };
        this.close = function (x, y) {
            clearTimeout(_this.timer);
            _this.ws.close(x || 1e3, y);
        };
        this.open();
    }
    return Socket;
}());
exports.Socket = Socket;
var reconnectErrors = [
    'jwt: exp claim is invalid',
    'jwt: created too far in past (denylist)'
];
var WebsocketClient = /** @class */ (function (_super) {
    __extends(WebsocketClient, _super);
    function WebsocketClient(auth, getToken) {
        var _this = _super.call(this) || this;
        _this.getToken = getToken;
        _this.isUpdating = false;
        // The backoff for the timer, in milliseconds.
        _this.backoff = 5000;
        // The socket instance being tracked.
        _this.socket = null;
        // The URL being connected to for the socket.
        _this.url = null;
        // The authentication token passed along with every request to the Daemon.
        // By default this token expires every 15 minutes and must therefore be
        // refreshed at a pretty continuous interval. The socket server will respond
        // with "token expiring" and "token expired" events when approaching 3 minutes
        // and 0 minutes to expiry.
        _this.token = '';
        _this.updateToken = (function (getToken, socket) {
            if (_this.isUpdating) {
                return;
            }
            _this.isUpdating = true;
            getToken().then(function (data) { return socket.setToken(data.token); });
        }).bind(undefined, _this.getToken, _this);
        _this.setToken(auth.token).connect(auth.socket);
        return _this;
    }
    // Connects to the websocket instance and sets the token for the initial request.
    WebsocketClient.prototype.connect = function (url) {
        var _this = this;
        this.url = url;
        this.socket = new Socket(this.url, {
            onmessage: function (e) {
                try {
                    var _a = JSON.parse(e.data.toString()), event_1 = _a.event, args = _a.args;
                    args ? _this.emit.apply(_this, __spreadArray([event_1], args, false)) : _this.emit(event_1);
                }
                catch (ex) {
                    console.warn('Failed to parse incoming websocket message.', ex);
                }
            },
            onopen: function () {
                // Clear the timers, we managed to connect just fine.
                _this.timer && clearTimeout(_this.timer);
                _this.backoff = 5000;
                _this.emit('SOCKET_OPEN');
                _this.authenticate();
            },
            onreconnect: function () {
                _this.emit('SOCKET_RECONNECT');
                _this.authenticate();
            },
            onclose: function () { return _this.emit('SOCKET_CLOSE'); },
            onerror: function (event) {
                if (event.message ===
                    'WebSocket was closed before the connection was established')
                    return;
                throw new Error(event.message);
            },
            onmaximum: function () {
                return;
            }
        });
        this.on('daemon error', function (message) {
            console.error(message);
        });
        this.on('token expiring', function () { return _this.updateToken(); });
        this.on('token expired', function () { return _this.updateToken(); });
        this.on('jwt error', function (error) {
            if (reconnectErrors.find(function (v) { return error.toLowerCase().indexOf(v) >= 0; })) {
                _this.updateToken();
            }
            else {
                throw new Error(error);
            }
        });
        this.on('transfer status', function (status) {
            if (status === 'starting' || status === 'success') {
                return;
            }
            // This code forces a reconnection to the websocket which will connect us to the target node instead of the source node
            // in order to be able to receive transfer logs from the target node.
            _this.close();
            _this.open();
        });
        this.timer = setTimeout(function () {
            _this.backoff = _this.backoff + 2500 >= 20000 ? 20000 : _this.backoff + 2500;
            _this.socket && _this.socket.close(undefined, 'timeout');
            clearTimeout(_this.timer);
            // Re-attempt connecting to the socket.
            _this.connect(url);
        }, this.backoff);
        return this;
    };
    // Sets the authentication token to use when sending commands back and forth
    // between the websocket instance.
    WebsocketClient.prototype.setToken = function (token, isUpdate) {
        if (isUpdate === void 0) { isUpdate = false; }
        this.token = token;
        if (isUpdate) {
            this.authenticate();
        }
        return this;
    };
    WebsocketClient.prototype.authenticate = function () {
        if (this.url && this.token) {
            this.send('auth', this.token);
        }
    };
    WebsocketClient.prototype.close = function (code, reason) {
        this.url = null;
        this.token = '';
        this.socket && this.socket.close(code, reason);
    };
    WebsocketClient.prototype.open = function () {
        this.socket && this.socket.open();
    };
    WebsocketClient.prototype.send = function (event, payload) {
        this.socket &&
            this.socket.send(JSON.stringify({
                event: event,
                args: Array.isArray(payload) ? payload : [payload]
            }));
    };
    return WebsocketClient;
}(events_1.EventEmitter));
exports.WebsocketClient = WebsocketClient;
