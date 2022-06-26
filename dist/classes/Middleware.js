"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Middleware {
    respondWith(response) {
        this.response = response;
    }
    getPossibleResponse() {
        return this.response;
    }
}
exports.default = Middleware;
