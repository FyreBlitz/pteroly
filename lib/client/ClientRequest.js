"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var ClientRequest = /** @class */ (function () {
    function ClientRequest(host, key) {
        var _this = this;
        this.getRequest = function (request, data, _data) {
            var url = getUrl(request, _this.host, data, _data);
            switch (request) {
                case "GetServerStatus":
                case 'GetCPUUsage':
                case 'GetDiskUsage':
                case 'GetMemoryUsage':
                    return (0, axios_1.default)({
                        url: url,
                        maxRedirects: 5,
                        headers: {
                            'Authorization': 'Bearer ' + _this.key,
                            'Content-Type': 'application/json',
                            'Accept': 'Application/vnd.pterodactyl.v1+json',
                        },
                    }).then(function (response) {
                        switch (request) {
                            case 'GetServerStatus':
                                return response.data.attributes.current_state;
                            case 'GetCPUUsage':
                                return response.data.attributes.cpu_absolute;
                            case 'GetMemoryUsage':
                                return response.data.attributes.resources.memory_bytes / 100000;
                            case 'GetDiskUsage':
                                return response.data.attributes.resources.disk_bytes / 100000;
                            default:
                                if ("".concat(request).startsWith('GetAll') || request == 'Console')
                                    return response.data.data;
                                return response.data.attributes;
                        }
                    }).catch(function (err) {
                        var error = createError(request, err);
                        if (error)
                            throw err;
                    });
                default:
                    return (0, axios_1.default)({
                        url: url,
                        method: 'GET',
                        maxRedirects: 5,
                        headers: {
                            'Authorization': 'Bearer ' + _this.key,
                            'Content-Type': 'application/json',
                            'Accept': 'Application/vnd.pterodactyl.v1+json',
                        },
                    }).then(function (response) {
                        if (request.startsWith("GetAll")) {
                            return response.data.data;
                        }
                        switch (request) {
                            case 'GetServerInfo':
                                return response.data.attributes;
                            case 'IsOwner':
                                return response.data.attributes.server_owner;
                            case 'GetCPU':
                                return response.data.attributes.limits.cpu;
                            case 'GetMemory':
                                return response.data.attributes.limits.memory;
                            case 'GetDisk':
                                return response.data.attributes.limits.disk;
                            case 'GetServerName':
                                return response.data.attributes.name;
                            case 'GetNummericIP':
                                return response.data.attributes.relationships.allocations.data.attributes.ip;
                            case 'GetServerPort':
                                return response.data.attributes.relationships.allocations.data.attributes.port;
                            case 'GetServerIPAlias':
                                return response.data.attributes.relationships.allocations.data.attributes.ip_alias;
                            default:
                                if (request.startsWith('GetAll') || request == 'Console')
                                    return response.data.data;
                                return response.data.attributes;
                        }
                    }).catch(function (err) {
                        var error = createError(request, err);
                        if (error)
                            throw error;
                    });
            }
        };
        // websocket = async (request: string, data: any, _data: any) => {
        // 	const result = await this.getRequest(request, data, _data).catch((err: any) => console.error(err))
        // 	if (result != null) {
        // 		const { token, socket } = result
        // 		if (token && socket) {
        // 			const webSocket = new WebSocket(socket)
        // 			webSocket.send(JSON.stringify({
        // 				event: 'auth',
        // 				args:  [token]
        // 			}));
        // 			webSocket.onmessage = (event) => {
        // 				console.log(event);
        // 			}
        // 			return webSocket;
        // 		}
        // 	}
        // 	return null;
        // }
        this.postRequest = function (request, data, _data) {
            var url = getUrl(request, _this.host, data, _data);
            return (0, axios_1.default)({
                url: url,
                method: 'POST',
                maxRedirects: 5,
                headers: {
                    'Authorization': 'Bearer ' + _this.key,
                    'Content-Type': 'application/json',
                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                },
                data: data,
            }).then(function (response) {
                return response.data;
            }).catch(function (err) {
                var error = createError(request, err);
                if (error)
                    throw error;
            });
        };
        this.deleteRequest = function (request, data, _data) {
            var url = getUrl(request, _this.host, data, _data);
            return (0, axios_1.default)({
                url: url,
                method: 'DELETE',
                maxRedirects: 5,
                headers: {
                    'Authorization': 'Bearer ' + _this.key,
                    'Content-Type': 'application/json',
                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                },
            }).then(function (response) {
                return response.data;
            }).catch(function (err) {
                var error = createError(request, err);
                if (error)
                    throw error;
            });
        };
        this.cPostRequest = function (path, body) {
            var url = _this.host + '/api/client/' + path;
            return (0, axios_1.default)({
                url: url,
                method: 'POST',
                maxRedirects: 5,
                headers: {
                    'Authorization': 'Bearer ' + _this.key,
                    'Content-Type': 'application/json',
                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                },
                data: body,
            }).then(function (response) {
                return response.data;
            }).catch(function (err) {
                throw err;
            });
        };
        this.cGetRequest = function (path) {
            var url = _this.host + '/api/client/' + path;
            return (0, axios_1.default)({
                url: url,
                method: 'GET',
                maxRedirects: 5,
                headers: {
                    'Authorization': 'Bearer ' + _this.key,
                    'Content-Type': 'application/json',
                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                },
            }).then(function (response) {
                return response.data;
            }).catch(function (err) {
                throw err;
            });
        };
        this.cDeleteRequest = function (path) {
            var url = _this.host + '/api/client/' + path;
            return (0, axios_1.default)({
                url: url,
                method: 'DELETE',
                maxRedirects: 5,
                headers: {
                    'Authorization': 'Bearer ' + _this.key,
                    'Content-Type': 'application/json',
                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                },
            }).then(function (response) {
                return response.data;
            }).catch(function (err) {
                throw err;
            });
        };
        this.cPutRequest = function (path, body) {
            var url = _this.host + '/api/client/' + path;
            return (0, axios_1.default)({
                url: url,
                method: 'PUT',
                maxRedirects: 5,
                headers: {
                    'Authorization': 'Bearer ' + _this.key,
                    'Content-Type': 'application/json',
                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                },
                data: body,
            }).then(function (response) {
                return response.data;
            }).catch(function (err) {
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
        case 'GetServerStatus':
        case 'GetCPUUsage':
        case 'GetMemoryUsage':
        case 'GetDiskUsage':
            return host + '/api/client/servers/' + data + '/resources';
        case 'GetAllServers':
            return host + '/api/client/';
        case 'GetServerInfo':
        case 'IsOwner':
        case 'GetCPU':
        case 'GetMemory':
        case 'GetDisk':
        case 'GetServerName':
        case 'GetNummericIP':
        case 'GetServerPort':
        case 'GetServerIPAlias':
            return host + '/api/client/servers/' + data;
        case 'StartServer':
        case 'StopServer':
        case 'KillServer':
        case 'RestartServer':
            return host + '/api/client/servers/' + data + '/power';
        case 'SendCommand':
            return host + '/api/client/servers/' + data + '/command';
        // Backups
        case 'CreateBackup':
        case 'GetAllBackups':
            if (_data != null)
                return host + '/api/client/servers/' + _data + '/backups';
            return host + '/api/client/servers/' + data + '/backups';
        case 'DeleteBackup':
        case 'GetBackupInfo':
            return host + '/api/client/servers/' + data + '/backups/' + _data;
        case 'DownloadBackup':
            return host + '/api/client/servers/' + data + '/backups/' + _data + '/download';
        // Other
        case 'Console':
            return host + '/api/client/servers/' + data + '/websocket';
        default:
            return host + '/api/client/';
    }
};
var createError = function (request, err) {
    return err;
};
exports.default = ClientRequest;
