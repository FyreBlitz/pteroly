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
// const NodeCache = require("node-cache");
var node_ts_cache_1 = require("node-ts-cache");
var node_ts_cache_storage_memory_1 = require("node-ts-cache-storage-memory");
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
var ApplicationRequest = /** @class */ (function () {
    function ApplicationRequest(host, key) {
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
                                        case 0:
                                            if (!request.startsWith("List")) return [3 /*break*/, 4];
                                            if (!(_data === true)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, setItem(url, response.data)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, response.data];
                                        case 2: return [4 /*yield*/, setItem(url, response.data.data)];
                                        case 3:
                                            _a.sent();
                                            return [2 /*return*/, response.data.data];
                                        case 4:
                                            if (!(request == "UserQuery")) return [3 /*break*/, 6];
                                            return [4 /*yield*/, setItem(url, response.data.data[0].attributes)];
                                        case 5:
                                            _a.sent();
                                            return [2 /*return*/, response.data.data[0].attributes];
                                        case 6:
                                            if (!(_data === true)) return [3 /*break*/, 8];
                                            return [4 /*yield*/, setItem(url, response.data)];
                                        case 7:
                                            _a.sent();
                                            return [2 /*return*/, response.data];
                                        case 8: return [4 /*yield*/, setItem(url, response.data.attributes)];
                                        case 9:
                                            _a.sent();
                                            return [2 /*return*/, response.data.attributes];
                                    }
                                });
                            }); }).catch(function (err) {
                                throw err;
                            })];
                    }
                });
            });
        };
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
                        case 0: return [4 /*yield*/, setItem(url, response.data.attributes)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, response.data.attributes];
                    }
                });
            }); }).catch(function (err) {
                throw err;
            });
        };
        this.patchRequest = function (request, data, _data) {
            var url = getUrl(request, _this.host, data, _data);
            return (0, axios_1.default)({
                url: url,
                method: "PATCH",
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
                        case 0: return [4 /*yield*/, setItem(url, response.data.attributes)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, response.data.attributes];
                    }
                });
            }); }).catch(function (err) {
                throw err;
            });
        };
        this.deleteRequest = function (request, data, _data) {
            var url = getUrl(request, _this.host, data, _data); // _data is nullable
            return (0, axios_1.default)({
                url: url,
                method: "DELETE",
                maxRedirects: 5,
                headers: {
                    "Authorization": "Bearer " + _this.key,
                    "Content-Type": "application/json",
                    "Accept": "Application/vnd.pterodactyl.v1+json",
                },
            }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, setItem(url, null)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, createObjectSuccess("Deleted successfully")];
                    }
                });
            }); }).catch(function (err) {
                throw err;
            });
        };
        this.cPostRequest = function (path, body) {
            var url = _this.host + "/api/application/" + path;
            // var body = body;
            // if (typeof body != "string") body = JSON.stringify(body);
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
            var url = _this.host + "/api/application/" + path;
            // var body = body;
            // if (typeof body != "string") body = JSON.stringify(body);
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
        this.cGetRequest = function (path, page) { return __awaiter(_this, void 0, void 0, function () {
            var url, cached, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (this.host + "/api/application/" + path).replace("//", "/");
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
        }); };
        this.cDeleteRequest = function (path) {
            var url = _this.host + "/api/application/" + path;
            return (0, axios_1.default)({
                url: url,
                method: "DELETE",
                maxRedirects: 5,
                headers: {
                    "Authorization": "Bearer " + _this.key,
                    "Content-Type": "application/json",
                    "Accept": "Application/vnd.pterodactyl.v1+json",
                },
            }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, setItem(url, null)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, createObjectSuccess("Deleted successfully")];
                    }
                });
            }); }).catch(function (err) {
                throw err;
            });
        };
        this.cPutRequest = function (path, body) {
            var url = _this.host + "/api/application/" + path;
            // var body = body;
            // if (typeof body != "string") body = JSON.stringify(body);
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
    return ApplicationRequest;
}());
var getUrl = function (request, host, data, _data) {
    switch (request) {
        // User actions
        case "EditUser":
        case "DeleteUser":
        case "UserDetails":
            if (_data != null)
                return host + "/api/application/users/" + _data;
            return host + "/api/application/users/" + data;
        case "UserQuery":
            return host + "/api/application/users?filter=" + data;
        case "CreateUser":
        case "ListUsers":
            return host + "/api/application/users";
        // Server actions
        case "CreateServer":
            if (_data != null)
                return host + "/api/application/servers?node=" + _data;
            return host + "/api/application/servers";
        case "ListServers":
            return host + "/api/application/servers";
        case "ServerDetails":
        case "DeleteServer":
            return host + "/api/application/servers/" + data;
        case "UpdateBuild":
            return host + "/api/application/servers/" + _data + "/build";
        case "UpdateDetails":
            return host + "/api/application/servers/" + _data + "/details";
        case "SuspendServer":
            return host + "/api/application/servers/" + _data + "/suspend";
        case "UnsuspendServer":
            return host + "/api/application/servers/" + _data + "/unsuspend";
        case "ReinstallServer":
            return host + "/api/application/servers/" + _data + "/reinstall";
        case "ForceDeleteServer":
            return host + "/api/application/servers/" + data + "/force";
        // Node actions
        case "ListNodes":
        case "CreateNode":
            return host + "/api/application/nodes";
        case "UpdateNode":
        case "DeleteNode":
            return host + "/api/application/nodes/" + data;
        case "ListAllocations":
            return host + "/api/application/nodes/" + data + "/allocations";
        case "CreateAllocation":
            return host + "/api/application/nodes/" + _data + "/allocations";
        case "DeleteAllocation":
            return host + "/api/application/nodes/" + data + "/allocations/" + _data;
        // Database actions
        case "CreateDatabase":
        case "ListDatabases":
            if (_data != null)
                return host + "/api/application/servers/" + _data + "/databases";
            return host + "/api/application/servers/" + data + "/databases";
        case "DeleteDatabase":
        case "DatabaseDetails":
            return host + "/api/application/servers/" + data + "/databases/" + _data;
        case "ResetDatabasePassword":
            return host + "/api/application/servers/" + data + "/databases/" + _data + "/reset-password";
        // Location actions
        case "ListLocations":
        case "CreateLocation":
            return host + "/api/application/locations";
        case "DeleteLocation":
        case "LocationDetails":
        case "UpdateLocation":
            if (_data != null)
                return host + "/api/application/locations/" + _data;
            return host + "/api/application/locations/" + data;
        // Nest/Eggs Actions
        case "ListNests":
            return host + "/api/application/nests";
        case "ListEggs":
            return host + "/api/application/nests/" + data + "/eggs";
        case "EggDetails":
            return host + "/api/application/nests/" + data + "/eggs/" + _data;
        case "NestDetails":
            return host + "/api/application/nests/" + data;
        default: return host + "/api/application/";
    }
};
var getItem = function (url) {
    var caching = !!process.env.APPLICATION_CACHING;
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
                caching = !!process.env.APPLICATION_CACHING;
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
            case 3: return [4 /*yield*/, reqCache.setItem(url, data, { ttl: 1 * 60 })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, true];
        }
    });
}); };
var createObjectSuccess = function (message) {
    return {
        success: true,
        message: message,
    };
};
exports.default = ApplicationRequest;
