"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaveDC = void 0;
var converter_1 = require("../utils/converter");
var calculator_1 = require("./calculator");
var modifiers_1 = require("./modifiers");
/**
 * gets the save DC for spellcasters or returns NaN if doesnt existing
 */
var getSaveDC = function (character) {
    for (var i = 0; i < character.classes.length; i++) {
        var cls = character.classes[i];
        if (cls.definition.canCastSpells) {
            var dc = 8;
            dc += (0, calculator_1.calculateProficiencyBonus)((0, calculator_1.calculateTotalLevel)(character.classes));
            dc += (0, modifiers_1.getAbilityScoreModifier)(character, (0, converter_1.convertBeyondStatIdToAbility)(cls.definition.spellCastingAbilityId));
            return dc;
        }
    }
    return NaN;
};
exports.getSaveDC = getSaveDC;
