import { CharacterData, ItemDefinition } from "../models";
import { getAbilityScoreModifier, getAllModifiersOfType, sumAllModifiersOfType, sumModifiersOfType } from "../parsers/modifiers";
import { convertBeyondStatIdToAbility } from "../utils/converter";

export const ARMOR_TYPE_LIGHT = 1;
export const ARMOR_TYPE_MEDIUM = 2;
export const ARMOR_TYPE_HEAVY = 3;
export const ARMOR_TYPE_SHIELD = 4;


const isArmorItem = (itemDefinition: ItemDefinition): boolean => {
  return itemDefinition.filterType === 'Armor';
}

const calculateItemAc = (itemDefinition: ItemDefinition, dexMod: number = 0, includeItemMods: boolean = true): number => {
  let itemAc = itemDefinition.armorClass || 0;

  switch (itemDefinition.armorTypeId || 0) {
    case ARMOR_TYPE_LIGHT:
      itemAc += dexMod;
      break;
    case ARMOR_TYPE_MEDIUM:
      itemAc += Math.min(dexMod, 2);
      break;
    case ARMOR_TYPE_HEAVY:
    case ARMOR_TYPE_SHIELD:
    default:
      break;
  }

  if (includeItemMods && itemDefinition.grantedModifiers) {
    itemAc += sumModifiersOfType(itemDefinition.grantedModifiers,
      'bonus',
      'armor-class'
    );
  }

  return itemAc;
}

export const getAC = (character: CharacterData): number => {
  const dexMod = getAbilityScoreModifier(character, 'dexterity');
  let characterAc = 10 + dexMod;
  let armorAc = 0;
  let shieldAc = 0;
  const equippedItems = character.inventory.filter(item => item.equipped && item.definition);

  const equippedShields = equippedItems.filter(item =>
    item.definition.armorTypeId && ARMOR_TYPE_SHIELD === item.definition.armorTypeId
  );

  const equippedArmor = equippedItems.filter(item =>
    isArmorItem(item.definition) && ARMOR_TYPE_SHIELD !== item.definition.armorTypeId
  );

  if (equippedShields.length > 0) {
    shieldAc = Math.max(...equippedShields.map(item =>
      calculateItemAc(item.definition, dexMod, false)
    ));
  }

  if (equippedArmor.length > 0) {
    armorAc = Math.max(...equippedArmor.map(item =>
      calculateItemAc(item.definition, dexMod, false)
    ));
  } else {
    const unarmoredModifiers = getAllModifiersOfType(character.modifiers, 'set', 'unarmored-armor-class') || [];
    armorAc = Math.max(...unarmoredModifiers.map(modifier => {
      let ac = characterAc;
      if (modifier.statId) {
        const validId = convertBeyondStatIdToAbility(modifier.statId);
        if (validId) {
          ac += getAbilityScoreModifier(character, validId);
        }

      }

      if (modifier.value) {
        ac += modifier.value;
      }

      return ac;
    }));
  }

  const bonusAc = sumAllModifiersOfType(character.modifiers ?? [], 'bonus', 'armor-class');

  return Math.max(characterAc, armorAc) + shieldAc + bonusAc;
}
