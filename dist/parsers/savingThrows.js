"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavingThrows = void 0;
var calculator_1 = require("./calculator");
var modifiers_1 = require("./modifiers");
var getSavingThrows = function (character) {
    var result = {
        str: getSaveBonus(character, 'strength'),
        dex: getSaveBonus(character, 'dexterity'),
        con: getSaveBonus(character, 'constitution'),
        int: getSaveBonus(character, 'intelligence'),
        wis: getSaveBonus(character, 'wisdom'),
        cha: getSaveBonus(character, 'charisma')
    };
    return result;
};
exports.getSavingThrows = getSavingThrows;
var getSaveBonus = function (character, ability) {
    var mod = (0, modifiers_1.getAbilityScoreModifier)(character, ability);
    if (character.modifiers) {
        var activeBonuses = (0, modifiers_1.getAllModifiersOfType)(character.modifiers, 'proficiency', "".concat(ability, "-saving-throws"));
        if (activeBonuses.length > 0) {
            mod += (0, calculator_1.calculateProficiencyBonus)((0, calculator_1.calculateTotalLevel)(character.classes));
        }
    }
    return mod;
};
