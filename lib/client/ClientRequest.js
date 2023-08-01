"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var axios_1 = require("axios");
var node_ts_cache_1 = require("node-ts-cache");
var node_ts_cache_storage_memory_1 = require("node-ts-cache-storage-memory");
var Websocket_1 = require("./Websocket");
var reqCache = new node_ts_cache_1.CacheContainer(new node_ts_cache_storage_memory_1.MemoryStorage());
var unique = function (arr) {
    var uniqueIds = [];
    arr.filter(function (element) {
        var isDuplicate = uniqueIds.includes(element);
        if (!isDuplicate) {
            uniqueIds.push(element);
            return true;
        }
        return false;
    });
    return uniqueIds;
};
var ClientRequest = /** @class */ (function () {
    function ClientRequest(host, key) {
        var _this = this;
        this.depaginateRequest = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var MAX_REQUESTS, firstPage, _a, total, count, result, perPageOverwrite, pagesToFetch, i, response;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        MAX_REQUESTS = 3;
                        return [4 /*yield*/, (0, axios_1.default)({
                                url: "".concat(url, "?page=1"),
                                method: "GET",
                                maxRedirects: 5,
                                headers: {
                                    "Authorization": "Bearer " + this.key,
                                    "Content-Type": "application/json",
                                    "Accept": "Application/vnd.pterodactyl.v1+json",
                                },
                            })];
                    case 1:
                        firstPage = (_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.data;
                        _a = firstPage.meta.pagination, total = _a.total, count = _a.count;
                        result = __spreadArray([], firstPage.data, true);
                        perPageOverwrite = Math.ceil((total - count) >= MAX_REQUESTS * 100 ? (total - count) / MAX_REQUESTS : (total - count));
                        pagesToFetch = Math.ceil((total - count) / perPageOverwrite) >= MAX_REQUESTS ? MAX_REQUESTS : Math.ceil((total - count) / perPageOverwrite);
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < pagesToFetch)) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, axios_1.default)({
                                url: "".concat(url, "?page=").concat(i, "&per_page=").concat(perPageOverwrite),
                                method: "GET",
                                maxRedirects: 5,
                                headers: {
                                    "Authorization": "Bearer " + this.key,
                                    "Content-Type": "application/json",
                                    "Accept": "Application/vnd.pterodactyl.v1+json",
                                },
                            })];
                    case 3:
                        response = _c.sent();
                        result = __spreadArray(__spreadArray([], result, true), response.data.data, true);
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, unique(result)];
                }
            });
        }); };
        this.getRequest = function (request, data, _data, page) {
            if (page === void 0) { page = 0; }
            return __awaiter(_this, void 0, void 0, function () {
                var url, cached, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = getUrl(request, this.host, data, _data);
                            return [4 /*yield*/, getItem(page >= 0 ? url : url + ":depaginated")];
                        case 1:
                            cached = _a.sent();
                            if (cached)
                                return [2 /*return*/, cached];
                            if (!(page < 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.depaginateRequest(url)];
                        case 2:
                            result = _a.sent();
                            return [4 /*yield*/, setItem(url + ":depaginated", result)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, result];
                        case 4:
                            switch (request) {
                                case "GetServerStatus":
                                case "GetCPUUsage":
                                case "GetDiskUsage":
                                case "GetMemoryUsage":
                                    return [2 /*return*/, (0, axios_1.default)({
                                            url: url,
                                            maxRedirects: 5,
                                            headers: {
                                                "Authorization": "Bearer " + this.key,
                                                "Content-Type": "application/json",
                                                "Accept": "Application/vnd.pterodactyl.v1+json",
                                            },
                                        }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        _a = request;
                                                        switch (_a) {
                                                            case "GetServerStatus": return [3 /*break*/, 1];
                                                            case "GetCPUUsage": return [3 /*break*/, 3];
                                                            case "GetMemoryUsage": return [3 /*break*/, 5];
                                                            case "GetDiskUsage": return [3 /*break*/, 6];
                                                        }
                                                        return [3 /*break*/, 8];
                                                    case 1: return [4 /*yield*/, setItem(url, response.data.attributes.current_state)];
                                                    case 2:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes.current_state];
                                                    case 3: return [4 /*yield*/, setItem(url, response.data.attributes.cpu_absolute)];
                                                    case 4:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes.cpu_absolute];
                                                    case 5: return [2 /*return*/, response.data.attributes.resources.memory_bytes / 100000];
                                                    case 6: return [4 /*yield*/, setItem(url, response.data.attributes.resources.disk_bytes / 100000)];
                                                    case 7:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes.resources.disk_bytes / 100000];
                                                    case 8:
                                                        if (!("".concat(request).startsWith("List") || request == "Console")) return [3 /*break*/, 10];
                                                        return [4 /*yield*/, setItem(url, response.data.data)];
                                                    case 9:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.data];
                                                    case 10: return [4 /*yield*/, setItem(url, response.data.attributes)];
                                                    case 11:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes];
                                                }
                                            });
                                        }); }).catch(function (err) {
                                            throw err;
                                        })];
                                default:
                                    return [2 /*return*/, (0, axios_1.default)({
                                            url: url,
                                            method: "GET",
                                            maxRedirects: 5,
                                            headers: {
                                                "Authorization": "Bearer " + this.key,
                                                "Content-Type": "application/json",
                                                "Accept": "Application/vnd.pterodactyl.v1+json",
                                            },
                                        }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        if (!request.startsWith("List")) return [3 /*break*/, 2];
                                                        return [4 /*yield*/, setItem(url, response.data.data)];
                                                    case 1:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.data];
                                                    case 2:
                                                        _a = request;
                                                        switch (_a) {
                                                            case "GetServerInfo": return [3 /*break*/, 3];
                                                            case "IsOwner": return [3 /*break*/, 5];
                                                            case "GetCPU": return [3 /*break*/, 7];
                                                            case "GetMemory": return [3 /*break*/, 9];
                                                            case "GetDisk": return [3 /*break*/, 11];
                                                            case "GetServerName": return [3 /*break*/, 13];
                                                            case "GetNummericIP": return [3 /*break*/, 15];
                                                            case "GetServerPort": return [3 /*break*/, 17];
                                                            case "GetServerIPAlias": return [3 /*break*/, 19];
                                                        }
                                                        return [3 /*break*/, 21];
                                                    case 3: return [4 /*yield*/, setItem(url, response.data.attributes)];
                                                    case 4:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes];
                                                    case 5: return [4 /*yield*/, setItem(url, response.data.attributes.is_owner)];
                                                    case 6:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes.server_owner];
                                                    case 7: return [4 /*yield*/, setItem(url, response.data.attributes.limits.cpu)];
                                                    case 8:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes.limits.cpu];
                                                    case 9: return [4 /*yield*/, setItem(url, response.data.attributes.limits.memory)];
                                                    case 10:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes.limits.memory];
                                                    case 11: return [4 /*yield*/, setItem(url, response.data.attributes.limits.disk)];
                                                    case 12:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes.limits.disk];
                                                    case 13: return [4 /*yield*/, setItem(url, response.data.attributes.name)];
                                                    case 14:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes.name];
                                                    case 15: return [4 /*yield*/, setItem(url, response.data.attributes.relationships.allocations.data[0].attributes.ip)];
                                                    case 16:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes.relationships.allocations.data[0].attributes.ip];
                                                    case 17: return [4 /*yield*/, setItem(url, response.data.attributes.relationships.allocations.data[0].attributes.port)];
                                                    case 18:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes.relationships.allocations.data[0].attributes.port];
                                                    case 19: return [4 /*yield*/, setItem(url, response.data.attributes.relationships.allocations.data[0].attributes.ip_alias)];
                                                    case 20:
                                                        _b.sent();
                                                        return [2 /*return*/, response.data.attributes.relationships.allocations.data[0].attributes.ip_alias];
                                                    case 21:
                                                        if (request.startsWith("List") || request == "Console")
                                                            return [2 /*return*/, response.data.data];
                                                        return [2 /*return*/, response.data.attributes];
                                                }
                                            });
                                        }); }).catch(function (err) {
                                            throw err;
                                        })];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.websocket = function (request, data, _data) { return __awaiter(_this, void 0, void 0, function () {
            var authData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRequest(request, data, _data)];
                    case 1:
                        authData = _a.sent();
                        return [2 /*return*/, new Websocket_1.WebsocketClient(authData, this.getRequest.bind(undefined, request, data, _data))];
                }
            });
        }); };
        this.postRequest = function (request, data, _data) {
            var url = getUrl(request, _this.host, data, _data);
            return (0, axios_1.default)({
                url: url,
                method: "POST",
                maxRedirects: 5,
                headers: {
                    "Authorization": "Bearer " + _this.key,
                    "Content-Type": "application/json",
                    "Accept": "Application/vnd.pterodactyl.v1+json",
                },
                data: data,
            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, setItem(url, response.data)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, response.data];
                    }
                });
            }); }).catch(function (err) {
                throw err;
            });
        };
        this.deleteRequest = function (request, data, _data) {
            var url = getUrl(request, _this.host, data, _data);
            return (0, axios_1.default)({
                url: url,
                method: "DELETE",
                maxRedirects: 5,
                headers: {
                    "Authorization": "Bearer " + _this.key,
                    "Content-Type": "application/json",
                    "Accept": "Application/vnd.pterodactyl.v1+json",
                },
            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, setItem(url, null)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, response.data];
                    }
                });
            }); }).catch(function (err) {
                throw err;
            });
        };
        this.cPostRequest = function (path, body) {
            var url = _this.host + "/api/client/" + path;
            return (0, axios_1.default)({
                url: url,
                method: "POST",
                maxRedirects: 5,
                headers: {
                    "Authorization": "Bearer " + _this.key,
                    "Content-Type": "application/json",
                    "Accept": "Application/vnd.pterodactyl.v1+json",
                },
                data: body,
            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, setItem(url, response.data)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, response.data];
                    }
                });
            }); }).catch(function (err) {
                throw err;
            });
        };
        this.cPatchRequest = function (path, body) {
            var url = _this.host + "/api/client/" + path;
            return (0, axios_1.default)({
                url: url,
                method: "PATCH",
                maxRedirects: 5,
                headers: {
                    "Authorization": "Bearer " + _this.key,
                    "Content-Type": "application/json",
                    "Accept": "Application/vnd.pterodactyl.v1+json",
                },
                data: body,
            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, setItem(url, response.data)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, response.data];
                    }
                });
            }); }).catch(function (err) {
                throw err;
            });
        };
        this.cGetRequest = function (path, page) {
            if (page === void 0) { page = 0; }
            return __awaiter(_this, void 0, void 0, function () {
                var url, cached, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.host + "/api/client/" + path;
                            return [4 /*yield*/, getItem(page >= 0 ? url : url + ":depaginated")];
                        case 1:
                            cached = _a.sent();
                            if (cached)
                                return [2 /*return*/, cached];
                            if (!(page < 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.depaginateRequest(url)];
                        case 2:
                            result = _a.sent();
                            return [4 /*yield*/, setItem(url + ":depaginated", result)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, result];
                        case 4: return [2 /*return*/, (0, axios_1.default)({
                                url: url,
                                method: "GET",
                                maxRedirects: 5,
                                headers: {
                                    "Authorization": "Bearer " + this.key,
                                    "Content-Type": "application/json",
                                    "Accept": "Application/vnd.pterodactyl.v1+json",
                                },
                            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, setItem(url, response.data)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, response.data];
                                    }
                                });
                            }); }).catch(function (err) {
                                throw err;
                            })];
                    }
                });
            });
        };
        this.cDeleteRequest = function (path) {
            var url = _this.host + "/api/client/" + path;
            return (0, axios_1.default)({
                url: url,
                method: "DELETE",
                maxRedirects: 5,
                headers: {
                    "Authorization": "Bearer " + _this.key,
                    "Content-Type": "application/json",
                    "Accept": "Application/vnd.pterodactyl.v1+json",
                },
            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, setItem(url, null)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, response.data];
                    }
                });
            }); }).catch(function (err) {
                throw err;
            });
        };
        this.cPutRequest = function (path, body) {
            var url = _this.host + "/api/client/" + path;
            return (0, axios_1.default)({
                url: url,
                method: "PUT",
                maxRedirects: 5,
                headers: {
                    "Authorization": "Bearer " + _this.key,
                    "Content-Type": "application/json",
                    "Accept": "Application/vnd.pterodactyl.v1+json",
                },
                data: body,
            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, setItem(url, response.data)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, response.data];
                    }
                });
            }); }).catch(function (err) {
                throw err;
            });
        };
        this.host = host;
        this.key = key;
    }
    return ClientRequest;
}());
var getUrl = function (request, host, data, _data) {
    switch (request) {
        // Servers
        case "GetServerStatus":
        case "GetCPUUsage":
        case "GetMemoryUsage":
        case "GetDiskUsage":
            return host + "/api/client/servers/" + data + "/resources";
        case "ListServers":
            if (_data != null && _data >= 0)
                return host + "/api/client?page=" + _data;
            if (_data == -1)
                return "";
            return host + "/api/client/";
        case "ServerDetails":
        case "IsOwner":
        case "GetCPU":
        case "GetMemory":
        case "GetDisk":
        case "GetServerName":
        case "GetNummericIP":
        case "GetServerPort":
        case "GetServerIPAlias":
            return host + "/api/client/servers/" + data;
        case "StartServer":
        case "StopServer":
        case "KillServer":
        case "RestartServer":
            return host + "/api/client/servers/" + _data + "/power";
        case "SendCommand":
            return host + "/api/client/servers/" + _data + "/command";
        // Backups
        case "CreateBackup":
        case "ListBackups":
            if (_data != null)
                return host + "/api/client/servers/" + _data + "/backups";
            return host + "/api/client/servers/" + data + "/backups";
        case "DeleteBackup":
        case "BackupDetails":
            return host + "/api/client/servers/" + data + "/backups/" + _data;
        case "DownloadBackup":
            return host + "/api/client/servers/" + data + "/backups/" + _data + "/download";
        // Other
        case "Console":
            return host + "/api/client/servers/" + data + "/websocket";
        default:
            return host + "/api/client/";
    }
};
var getItem = function (url) {
    var caching = !!process.env.CLIENT_CACHING;
    var result = new Promise(function (resolve, reject) {
        reqCache.getItem(url).then(function (value) {
            if (value && caching) {
                resolve(value);
            }
            else {
                resolve(null);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
    return result;
};
var setItem = function (url, data) { return __awaiter(void 0, void 0, void 0, function () {
    var caching, depaginated, depaginatedData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                caching = !!process.env.CLIENT_CACHING;
                if (!caching) return [3 /*break*/, 5];
                return [4 /*yield*/, getItem(url + ":depaginated")];
            case 1:
                depaginated = _a.sent();
                if (!depaginated) return [3 /*break*/, 3];
                depaginatedData = data.data ? data.data : data.attributes ? data.attributes : data;
                depaginated[depaginated.indexOf(depaginatedData)] = depaginatedData;
                return [4 /*yield*/, reqCache.setItem(url + ":depaginated", depaginated, { ttl: 10 * 60 })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, reqCache.setItem(url, data, { ttl: !url.endsWith(":depaginated") ? 1 * 60 : 10 * 60 })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, true];
        }
    });
}); };
exports.default = ClientRequest;
