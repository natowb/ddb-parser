"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBeyondStatIdToAbility = void 0;
var convertBeyondStatIdToAbility = function (statId) {
    var _a;
    var statMap = {
        1: 'strength',
        2: 'dexterity',
        3: 'constitution',
        4: 'intelligence',
        5: 'wisdom',
        6: 'charisma'
    };
    return (_a = statMap[statId]) !== null && _a !== void 0 ? _a : null;
};
exports.convertBeyondStatIdToAbility = convertBeyondStatIdToAbility;
