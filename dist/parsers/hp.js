"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitiativeBonus = exports.getMaxHP = exports.getCurrentHP = void 0;
var modifiers_1 = require("./modifiers");
var getCurrentHP = function (character) {
    var _a;
    var removedHP = ((_a = character.removedHitPoints) !== null && _a !== void 0 ? _a : 0);
    if (character.overrideHitPoints) {
        return character.overrideHitPoints - removedHP;
    }
    return (0, exports.getMaxHP)(character) - removedHP;
};
exports.getCurrentHP = getCurrentHP;
var getMaxHP = function (character) {
    var _a, _b;
    if (character.overrideHitPoints) {
        return character.overrideHitPoints;
    }
    var bonusPerLevelHp = (0, modifiers_1.sumAllModifiersOfType)(character.modifiers, 'bonus', 'hit-points-per-level');
    var con = (0, modifiers_1.getAbilityScoreModifier)(character, 'constitution');
    var baseHealth = (_a = character.baseHitPoints) !== null && _a !== void 0 ? _a : 0;
    var totalLevel = 0;
    for (var _i = 0, _c = character.classes; _i < _c.length; _i++) {
        var classData = _c[_i];
        totalLevel += classData.level;
    }
    var maxHp = 0;
    maxHp = baseHealth + (totalLevel * con) + (bonusPerLevelHp * con);
    maxHp += (_b = character.bonusHitPoints) !== null && _b !== void 0 ? _b : 0;
    return maxHp;
};
exports.getMaxHP = getMaxHP;
var getInitiativeBonus = function (character) {
    var dex = (0, modifiers_1.getAbilityScoreModifier)(character, 'dexterity');
    if (!character.modifiers) {
        return dex;
    }
    return dex + (0, modifiers_1.sumAllModifiersOfType)(character.modifiers, 'bonus', 'initiative');
};
exports.getInitiativeBonus = getInitiativeBonus;
