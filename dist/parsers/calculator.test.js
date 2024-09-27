"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var calculator_1 = require("./calculator"); // Update with the correct path
(0, globals_1.describe)('calculateTotalLevel', function () {
    (0, globals_1.it)('should correctly sum the levels of multiple classes', function () {
        var classes = [
            {
                level: 3,
                definition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                subclassDefinition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                isStartingClass: false
            },
            {
                level: 2,
                definition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                subclassDefinition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                isStartingClass: false
            },
            {
                level: 5,
                definition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                subclassDefinition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                isStartingClass: false
            },
        ];
        (0, globals_1.expect)((0, calculator_1.calculateTotalLevel)(classes)).toBe(10);
    });
    (0, globals_1.it)('should handle a single class correctly', function () {
        var classes = [{
                level: 4,
                definition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                subclassDefinition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                isStartingClass: false
            }];
        (0, globals_1.expect)((0, calculator_1.calculateTotalLevel)(classes)).toBe(4);
    });
    (0, globals_1.it)('should handle an empty array and return the minimum level of 1', function () {
        var classes = [];
        (0, globals_1.expect)((0, calculator_1.calculateTotalLevel)(classes)).toBe(1);
    });
    (0, globals_1.it)('should not allow levels to exceed 20', function () {
        var classes = [
            {
                level: 10,
                definition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                subclassDefinition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                isStartingClass: false
            },
            {
                level: 15,
                definition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                subclassDefinition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                isStartingClass: false
            }
        ];
        (0, globals_1.expect)((0, calculator_1.calculateTotalLevel)(classes)).toBe(20);
    });
    (0, globals_1.it)('should handle a case where the total level is less than 1', function () {
        var classes = [{
                level: -5,
                definition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                subclassDefinition: {
                    hitDice: 0,
                    canCastSpells: false,
                    spellCastingAbilityId: 0,
                    name: ""
                },
                isStartingClass: false
            }];
        (0, globals_1.expect)((0, calculator_1.calculateTotalLevel)(classes)).toBe(1);
    });
});
(0, globals_1.describe)('calculateProficiencyBonus', function () {
    (0, globals_1.it)('should return the correct proficiency bonus for levels 1-4', function () {
        [1, 2, 3, 4].forEach(function (level) {
            (0, globals_1.expect)((0, calculator_1.calculateProficiencyBonus)(level)).toBe(2);
        });
    });
    (0, globals_1.it)('should return the correct proficiency bonus for levels 5-8', function () {
        [5, 6, 7, 8].forEach(function (level) {
            (0, globals_1.expect)((0, calculator_1.calculateProficiencyBonus)(level)).toBe(3);
        });
    });
    (0, globals_1.it)('should return the correct proficiency bonus for levels 9-12', function () {
        [9, 10, 11, 12].forEach(function (level) {
            (0, globals_1.expect)((0, calculator_1.calculateProficiencyBonus)(level)).toBe(4);
        });
    });
    (0, globals_1.it)('should return the correct proficiency bonus for levels 13-16', function () {
        [13, 14, 15, 16].forEach(function (level) {
            (0, globals_1.expect)((0, calculator_1.calculateProficiencyBonus)(level)).toBe(5);
        });
    });
    (0, globals_1.it)('should return the correct proficiency bonus for levels 17-20', function () {
        [17, 18, 19, 20].forEach(function (level) {
            (0, globals_1.expect)((0, calculator_1.calculateProficiencyBonus)(level)).toBe(6);
        });
    });
    (0, globals_1.it)('should handle the minimum level case (1)', function () {
        (0, globals_1.expect)((0, calculator_1.calculateProficiencyBonus)(1)).toBe(2);
    });
    (0, globals_1.it)('should handle the maximum level case (20)', function () {
        (0, globals_1.expect)((0, calculator_1.calculateProficiencyBonus)(20)).toBe(6);
    });
});
(0, globals_1.describe)('calculateModifier', function () {
    (0, globals_1.it)('should return 5 for a score of 20', function () {
        (0, globals_1.expect)((0, calculator_1.calculateModifier)(20)).toBe(5);
    });
});
