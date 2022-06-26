"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("../symbols");
const ControllerContext_1 = require("../classes/internal/ControllerContext");
function SetMetaData(key, value) {
    return function (target, fieldName) {
        target[symbols_1.controllerContext] = target[symbols_1.controllerContext] ?? new ControllerContext_1.default(target);
        target[symbols_1.controllerContext].metaDataForKey = target[symbols_1.controllerContext].metaDataForKey.get(fieldName)
            ?? new Map();
        target[symbols_1.controllerContext].metaDataForKey.set(key, value);
    };
}
exports.default = SetMetaData;
