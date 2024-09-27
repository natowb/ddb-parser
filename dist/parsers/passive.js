"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPassives = void 0;
var calculator_1 = require("./calculator");
var modifiers_1 = require("./modifiers");
var getPassives = function (character) {
    return {
        perception: getPassiveScore(character, 'perception'),
        insight: getPassiveScore(character, 'insight'),
        investigation: getPassiveScore(character, 'investigation')
    };
};
exports.getPassives = getPassives;
var getPassiveScore = function (character, proficiencyName) {
    var statMod = 0;
    switch (proficiencyName) {
        case 'insight':
        case 'perception':
            statMod = (0, modifiers_1.getAbilityScoreModifier)(character, 'wisdom');
            break;
        case 'investigation':
            statMod = (0, modifiers_1.getAbilityScoreModifier)(character, 'intelligence');
            break;
        default:
            statMod = 0;
    }
    var skillMod = 0;
    var activeBonuses = (0, modifiers_1.getAllModifiersOfType)(character.modifiers, 'proficiency', "".concat(proficiencyName, "-saving-throws"));
    if (activeBonuses.length > 0) {
        skillMod = (0, calculator_1.calculateProficiencyBonus)((0, calculator_1.calculateTotalLevel)(character.classes));
    }
    var passiveBonuses = (0, modifiers_1.getAllModifiersOfType)(character.modifiers, 'bonus', "passive-".concat(proficiencyName));
    skillMod += passiveBonuses.reduce(function (sum, bonus) { return sum + bonus.value; }, 0);
    return 10 + statMod + skillMod;
};
