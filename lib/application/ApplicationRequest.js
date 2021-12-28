"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var ApplicationRequest = /** @class */ (function () {
    function ApplicationRequest(host, key) {
        var _this = this;
        this.cPostRequest = function (path, body) {
            var url = _this.host + '/api/application/' + path;
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
        this.cPatchRequest = function (path, body) {
            var url = _this.host + '/api/application/' + path;
            return (0, axios_1.default)({
                url: url,
                method: 'PATCH',
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
            var url = _this.host + '/api/application/' + path;
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
            var url = _this.host + '/api/application/' + path;
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
            var url = _this.host + '/api/application/' + path;
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
    ApplicationRequest.prototype.getRequest = function (request, data, _data) {
        var url = getUrl(request, this.host, data, _data);
        return (0, axios_1.default)({
            url: url,
            method: 'GET',
            maxRedirects: 5,
            headers: {
                'Authorization': 'Bearer ' + this.key,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            },
        }).then(function (response) {
            if (request.startsWith('GetAll'))
                return response.data.data;
            else
                return response.data.attributes;
        }).catch(function (err) {
            var error = createError(request, err, data);
            if (error)
                throw error;
        });
    };
    ApplicationRequest.prototype.postRequest = function (request, data, _data) {
        var url = getUrl(request, this.host, data, _data);
        return (0, axios_1.default)({
            url: url,
            method: 'POST',
            maxRedirects: 5,
            headers: {
                'Authorization': 'Bearer ' + this.key,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            },
            data: data,
        }).then(function (response) {
            return response.data.attributes;
        }).catch(function (error) {
            var err = createError(request, error, data);
            if (err)
                throw err;
        });
    };
    ApplicationRequest.prototype.patchRequest = function (request, data, _data) {
        var url = getUrl(request, this.host, data, _data);
        return (0, axios_1.default)({
            url: url,
            method: 'PATCH',
            maxRedirects: 5,
            headers: {
                'Authorization': 'Bearer ' + this.key,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            },
            data: data,
        }).then(function (response) {
            return response.data.attributes;
        }).catch(function (error) {
            var err = createError(request, error, data);
            if (err)
                throw err;
        });
    };
    ApplicationRequest.prototype.deleteRequest = function (request, data, _data) {
        var url = getUrl(request, this.host, data, _data); // data is nullable
        return (0, axios_1.default)({
            url: url,
            method: 'DELETE',
            maxRedirects: 5,
            headers: {
                'Authorization': 'Bearer ' + this.key,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            },
        }).then(function (response) {
            return createObjectSuccess('Deleted successfully.');
        }).catch(function (error) {
            var err = createError(request, error, null);
            if (err)
                throw err;
        });
    };
    return ApplicationRequest;
}());
function getUrl(request, host, data, _data) {
    switch (request) {
        // User actions
        case 'EditUser':
        case 'DeleteUser':
        case 'GetUserInfo':
            if (_data != null)
                return host + '/api/application/users/' + _data;
            return host + '/api/application/users/' + data;
        case 'CreateUser':
        case 'GetAllUsers':
            if (_data != null)
                return host + '/api/application/users?page=' + _data;
            return host + '/api/application/users';
        // Server actions
        case 'GetAllServers':
        case 'CreateServer':
            if (_data != null)
                return host + '/api/application/servers?page=' + _data;
            return host + '/api/application/servers';
        case 'GetServerInfo':
        case 'DeleteServer':
            return host + '/api/application/servers/' + data;
        case 'UpdateBuild':
            return host + '/api/application/servers/' + _data + '/build';
        case 'UpdateDetails':
            return host + '/api/application/servers/' + _data + '/details';
        case 'SuspendServer':
            return host + '/api/application/servers/' + _data + '/suspend';
        case 'UnsuspendServer':
            return host + '/api/application/servers/' + _data + '/unsuspend';
        case 'ReinstallServer':
            return host + '/api/application/servers/' + _data + '/reinstall';
        case 'ForceDeleteServer':
            return host + '/api/application/servers/' + data + '/force';
        // Node actions
        case 'GetAllNodes':
        case 'CreateNode':
            return host + '/api/application/nodes';
        case 'UpdateNode':
        case 'DeleteNode':
            return host + '/api/application/nodes/' + data;
        case 'GetAllAllocations':
            if (_data != null)
                return host + '/api/application/nodes/' + data + '/allocations?page=' + _data;
            return host + '/api/application/nodes/' + data + '/allocations';
        case 'CreateAllocation':
            return host + '/api/application/nodes/' + _data + '/allocations';
        case 'DeleteAllocation':
            return host + '/api/application/nodes/' + data + '/allocations/' + _data;
        // Database actions
        case 'CreateDatabase':
        case 'GetAllDatabases':
            if (_data != null)
                return host + '/api/application/servers/' + _data + '/databases';
            return host + '/api/application/servers/' + data + '/databases';
        case 'DeleteDatabase':
        case 'GetDatabaseInfo':
            return host + '/api/application/servers/' + data + '/databases/' + _data;
        case 'ResetDatabasePassword':
            return host + '/api/application/servers/' + data + '/databases/' + _data + '/reset-password';
        // Location actions
        case 'GetAllLocations':
        case 'CreateLocation':
            if (_data != null)
                return host + '/api/application/locations?page=' + _data;
            return host + '/api/application/locations';
        case 'DeleteLocation':
        case 'GetLocationInfo':
        case 'UpdateLocation':
            if (_data != null)
                return host + '/api/application/locations/' + _data;
            return host + '/api/application/locations/' + data;
        // Nest/Eggs Actions
        case 'GetAllNests':
            return host + '/api/application/nests';
        case 'GetAllEggs':
            return host + '/api/application/nests/' + data + '/eggs';
        case 'GetEggInfo':
            return host + '/api/application/nests/' + data + '/eggs/' + _data;
        case 'GetNestInfo':
            return host + '/api/application/nests/' + data;
        default:
            return host + '/api/application/';
    }
}
var createObjectSuccess = function (message) {
    return {
        'success': true,
        'message': message,
    };
};
var createError = function (request, err, data) {
    var error;
    if (request == 'CreateUser' || request == 'EditUser' || request == 'GetUserInfo') {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) == false) {
            error = new Error('The provided email is not a valid.');
            // error.status = 422
            return error;
        }
        else if (err.response.status == 422) {
            error = new Error('User already exists! (Or Email/Username is in use already)');
            // error.status = 422
            return error;
        }
        else if (err.response.status == 404) {
            error = new Error('User does not exist!');
            // error.status = 404
            return error;
        }
        else {
            return err;
        }
    }
    else if (typeof err.response != 'undefined' && err.response.hasOwnProperty('data')) {
        return err.response.data.errors;
    }
};
exports.default = ApplicationRequest;
