"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_js_1 = require("../Request.js");
var NodeAllocations = /** @class */ (function () {
    function NodeAllocations(hostname, key) {
        var _this = this;
        this.create = function (NodeID, data) { return _this.req.postRequest("/nodes/".concat(NodeID, "/allocations"), data); };
        this.list = function (NodeID, page) {
            if (page === void 0) { page = 1; }
            return _this.req.getRequest("/nodes/".concat(NodeID, "/allocations?page=").concat(page || 0));
        };
        this.delete = function (NodeID, ID) { return _this.req.deleteRequest("/nodes/".concat(NodeID, "/allocations/").concat(ID)); };
        this.req = new Request_js_1.default(hostname, key);
    }
    return NodeAllocations;
}());
exports.default = NodeAllocations;
