"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateModifier = exports.calculateProficiencyBonus = exports.getClasses = exports.calculateTotalLevel = void 0;
var calculateTotalLevel = function (classes) {
    var level = Object.values(classes).reduce(function (acc, curr) { return acc + curr.level; }, 0);
    return Math.max(1, Math.min(level, 20));
};
exports.calculateTotalLevel = calculateTotalLevel;
var getClasses = function (classes) {
    return classes.map(function (ddb) {
        var _a;
        var result = {
            level: ddb.level,
            name: ddb.definition.name,
            subclass: (_a = ddb.subclassDefinition) === null || _a === void 0 ? void 0 : _a.name,
        };
        return result;
    });
};
exports.getClasses = getClasses;
var calculateProficiencyBonus = function (level) {
    var skillProficiencyByLevel = [
        2, 2, 2, 2,
        3, 3, 3, 3,
        4, 4, 4, 4,
        5, 5, 5, 5,
        6, 6, 6, 6,
    ];
    return skillProficiencyByLevel[level - 1];
};
exports.calculateProficiencyBonus = calculateProficiencyBonus;
var calculateModifier = function (score) {
    return Math.floor((score - 10) / 2);
};
exports.calculateModifier = calculateModifier;
