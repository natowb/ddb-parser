import { CharacterData } from "../models";
import { sumAllModifiersOfType, getAbilityScoreModifier } from "./modifiers";

export const getCurrentHP = (character: CharacterData): number => {
  const removedHP = (character.removedHitPoints ?? 0);


  if (character.overrideHitPoints) {
    return character.overrideHitPoints - removedHP;
  }

  return getMaxHP(character) - removedHP;
}


export const getMaxHP = (character: CharacterData): number => {
  if (character.overrideHitPoints) {
    return character.overrideHitPoints;
  }

  const bonusPerLevelHp = sumAllModifiersOfType(character.modifiers, 'bonus', 'hit-points-per-level');
  const con = getAbilityScoreModifier(character, 'constitution');
  const baseHealth = character.baseHitPoints ?? 0;

  let totalLevel = 0;

  for (const classData of character.classes) {
    totalLevel += classData.level;
  }
  let maxHp = 0;
  maxHp = baseHealth + (totalLevel * con) + (bonusPerLevelHp * con);
  maxHp += character.bonusHitPoints ?? 0;

  return maxHp;
}


export const getInitiativeBonus = (character: CharacterData): number => {
  const dex = getAbilityScoreModifier(character, 'dexterity');

  if (!character.modifiers) {
    return dex;
  }

  return dex + sumAllModifiersOfType(character.modifiers, 'bonus', 'initiative');
}


