"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArmorClassBonus = exports.ARMOR_TYPE_SHIELD = exports.ARMOR_TYPE_HEAVY = exports.ARMOR_TYPE_MEDIUM = exports.ARMOR_TYPE_LIGHT = void 0;
var modifiers_1 = require("../parsers/modifiers");
var utils_1 = require("../utils");
exports.ARMOR_TYPE_LIGHT = 1;
exports.ARMOR_TYPE_MEDIUM = 2;
exports.ARMOR_TYPE_HEAVY = 3;
exports.ARMOR_TYPE_SHIELD = 4;
var isArmorItem = function (itemDefinition) {
    return itemDefinition.filterType === 'Armor';
};
var calculateItemAc = function (itemDefinition, dexMod, includeItemMods) {
    if (dexMod === void 0) { dexMod = 0; }
    if (includeItemMods === void 0) { includeItemMods = true; }
    var itemAc = itemDefinition.armorClass || 0;
    switch (itemDefinition.armorTypeId || 0) {
        case exports.ARMOR_TYPE_LIGHT:
            itemAc += dexMod;
            break;
        case exports.ARMOR_TYPE_MEDIUM:
            itemAc += Math.min(dexMod, 2);
            break;
        case exports.ARMOR_TYPE_HEAVY:
        case exports.ARMOR_TYPE_SHIELD:
        default:
            break;
    }
    if (includeItemMods && itemDefinition.grantedModifiers) {
        itemAc += (0, modifiers_1.sumModifiersOfType)(itemDefinition.grantedModifiers, 'bonus', 'armor-class');
    }
    return itemAc;
};
var getArmorClassBonus = function (character) {
    var _a;
    var dexMod = (0, modifiers_1.getAbilityScoreModifier)(character, 'dexterity');
    var characterAc = 10 + dexMod;
    var armorAc = 0;
    var shieldAc = 0;
    var equippedItems = character.inventory.filter(function (item) { return item.equipped && item.definition; });
    var equippedShields = equippedItems.filter(function (item) {
        return item.definition.armorTypeId && exports.ARMOR_TYPE_SHIELD === item.definition.armorTypeId;
    });
    var equippedArmor = equippedItems.filter(function (item) {
        return isArmorItem(item.definition) && exports.ARMOR_TYPE_SHIELD !== item.definition.armorTypeId;
    });
    if (equippedShields.length > 0) {
        shieldAc = Math.max.apply(Math, equippedShields.map(function (item) {
            return calculateItemAc(item.definition, dexMod, false);
        }));
    }
    if (equippedArmor.length > 0) {
        armorAc = Math.max.apply(Math, equippedArmor.map(function (item) {
            return calculateItemAc(item.definition, dexMod, false);
        }));
    }
    else {
        var unarmoredModifiers = (0, modifiers_1.getAllModifiersOfType)(character.modifiers, 'set', 'unarmored-armor-class') || [];
        armorAc = Math.max.apply(Math, unarmoredModifiers.map(function (modifier) {
            var ac = characterAc;
            if (modifier.statId) {
                var validId = (0, utils_1.convertBeyondStatIdToAbility)(modifier.statId);
                if (validId) {
                    ac += (0, modifiers_1.getAbilityScoreModifier)(character, validId);
                }
            }
            if (modifier.value) {
                ac += modifier.value;
            }
            return ac;
        }));
    }
    var bonusAc = (0, modifiers_1.sumAllModifiersOfType)((_a = character.modifiers) !== null && _a !== void 0 ? _a : [], 'bonus', 'armor-class');
    return Math.max(characterAc, armorAc) + shieldAc + bonusAc;
};
exports.getArmorClassBonus = getArmorClassBonus;
