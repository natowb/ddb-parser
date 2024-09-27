"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var converter_1 = require("./converter");
(0, globals_1.describe)('converter', function () {
    (0, globals_1.it)('should return correct ability for 1-6', function () {
    });
    (0, globals_1.it)('should return the correct proficiency bonus for levels 1-4', function () {
        [
            { value: 1, expected: 'strength' },
            { value: 2, expected: 'dexterity' },
            { value: 3, expected: 'constitution' },
            { value: 4, expected: 'intelligence' },
            { value: 5, expected: 'wisdom' },
            { value: 6, expected: 'charisma' }
        ].forEach(function (data) {
            (0, globals_1.expect)((0, converter_1.convertBeyondStatIdToAbility)(data.value)).toBe(data.expected);
        });
    });
    (0, globals_1.it)('should return null for any other numbers', function () {
        (0, globals_1.expect)((0, converter_1.convertBeyondStatIdToAbility)(0)).toBeNull();
    });
});
