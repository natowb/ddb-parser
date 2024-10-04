"use strict";
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
exports.getAbilityScoreModifier = exports.getAllModifiersOfType = exports.getModifiersOfType = exports.maxAllModifierOfType = exports.maxModifierOfType = exports.sumModifiersOfType = exports.sumAllModifiersOfType = void 0;
var calculator_1 = require("./calculator");
var sumAllModifiersOfType = function (modifiers, type, subType) {
    var combined = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], modifiers.class, true), modifiers.race, true), modifiers.item, true), modifiers.condition, true), modifiers.background, true), modifiers.feat, true);
    return (0, exports.sumModifiersOfType)(combined, type, subType);
};
exports.sumAllModifiersOfType = sumAllModifiersOfType;
var sumModifiersOfType = function (modifiers, type, subType) {
    if (subType === void 0) { subType = null; }
    var filtered = (0, exports.getModifiersOfType)(modifiers, type, subType);
    var values = filtered.map(function (modifier) { return modifier.value; });
    return values.reduce(function (sum, value) { return sum + value; }, 0);
};
exports.sumModifiersOfType = sumModifiersOfType;
var maxModifierOfType = function (modifiers, type, subType) {
    if (subType === void 0) { subType = null; }
    var filtered = (0, exports.getModifiersOfType)(modifiers, type, subType);
    var values = filtered.map(function (modifier) { return modifier.value; });
    if (values && values.length > 0) {
        return Math.max.apply(Math, values);
    }
    return 0;
};
exports.maxModifierOfType = maxModifierOfType;
var maxAllModifierOfType = function (modifiers, type, subType) {
    var combined = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], modifiers.class, true), modifiers.race, true), modifiers.item, true), modifiers.condition, true), modifiers.background, true), modifiers.feat, true);
    return (0, exports.maxModifierOfType)(combined, type, subType);
};
exports.maxAllModifierOfType = maxAllModifierOfType;
var getModifiersOfType = function (modifiers, type, subType) {
    if (subType === void 0) { subType = null; }
    var filtered = modifiers.filter(function (item) {
        return item.type && item.type === type;
    });
    if (subType) {
        filtered = filtered.filter(function (item) {
            return item.subType && item.subType === subType;
        });
    }
    return filtered;
};
exports.getModifiersOfType = getModifiersOfType;
var getAllModifiersOfType = function (modifiers, type, subType) {
    var combined = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], modifiers.class, true), modifiers.race, true), modifiers.item, true), modifiers.condition, true), modifiers.background, true), modifiers.feat, true);
    return (0, exports.getModifiersOfType)(combined, type, subType);
};
exports.getAllModifiersOfType = getAllModifiersOfType;
/**
 *  Takes the base modifiers object from the json and checks all entries in it. ie modifiers.race
 *
 *
 * */
var getAbilityScoreModifier = function (character, statName) {
    var statMap = {
        1: 'strength',
        2: 'dexterity',
        3: 'constitution',
        4: 'intelligence',
        5: 'wisdom',
        6: 'charisma'
    };
    var abilityScoreId = null;
    for (var dndbeyondId in statMap) {
        var allowedStat = statMap[dndbeyondId];
        if (statName === allowedStat) {
            abilityScoreId = Number(dndbeyondId);
            break;
        }
    }
    if (!abilityScoreId) {
        return 0;
    }
    var abilityScoreBonuses = (0, exports.sumAllModifiersOfType)(character.modifiers, 'bonus', statMap[abilityScoreId] + '-score');
    var abilityScoreValue = 0;
    // is this state overriding;
    var overridingStat = character.overrideStats.find(function (oStat) { return oStat.id === abilityScoreId && oStat.value !== null; });
    if (overridingStat && overridingStat.value) {
        abilityScoreValue = overridingStat.value;
    }
    else {
        var baseStat = character.stats.find(function (nStat) { return nStat.id === abilityScoreId && nStat.value !== null; });
        if (baseStat && baseStat.value) {
            abilityScoreValue = baseStat.value;
        }
    }
    return (0, calculator_1.calculateModifier)(abilityScoreValue + abilityScoreBonuses);
};
exports.getAbilityScoreModifier = getAbilityScoreModifier;
