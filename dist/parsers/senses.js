"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDarkvisionInFt = void 0;
var modifiers_1 = require("./modifiers");
var getDarkvisionInFt = function (character) {
    var darkVisionValue = (0, modifiers_1.maxAllModifierOfType)(character.modifiers, "set-base", "darkvision");
    return darkVisionValue;
};
exports.getDarkvisionInFt = getDarkvisionInFt;
