import { Ability, CharacterData, SavingThrows } from "../models";
import { calculateProficiencyBonus, calculateTotalLevel } from "./calculator";
import { getAbilityScoreModifier, getAllModifiersOfType } from "./modifiers";

export const getSavingThrows = (character: CharacterData) => {
  const result: SavingThrows = {
    str: getSaveBonus(character, 'strength'),
    dex: getSaveBonus(character, 'dexterity'),
    con: getSaveBonus(character, 'constitution'),
    int: getSaveBonus(character, 'intelligence'),
    wis: getSaveBonus(character, 'wisdom'),
    cha: getSaveBonus(character, 'charisma')
  }

  return result;
}


const getSaveBonus = (character: CharacterData, ability: Ability) => {
  let mod = getAbilityScoreModifier(character, ability);

  if (character.modifiers) {
    const activeBonuses = getAllModifiersOfType(character.modifiers, 'proficiency', `${ability}-saving-throws`);
    if (activeBonuses.length > 0) {
      mod += calculateProficiencyBonus(calculateTotalLevel(character.classes));
    }
  }
  return mod;
}
