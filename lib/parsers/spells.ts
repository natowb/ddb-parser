import { CharacterData } from "../models";
import { convertBeyondStatIdToAbility } from "../utils/converter";
import { calculateProficiencyBonus, calculateTotalLevel } from "./calculator";
import { getAbilityScoreModifier } from "./modifiers";

/**
 * gets the save DC for spellcasters or returns NaN if doesnt existing
 */
export const getSaveDC = (character: CharacterData): number => {
  for (let i = 0; i < character.classes.length; i++) {
    const cls = character.classes[i];
    if (cls.definition.canCastSpells) {
      let dc = 8;
      dc += calculateProficiencyBonus(calculateTotalLevel(character.classes));
      dc += getAbilityScoreModifier(character, convertBeyondStatIdToAbility(cls.definition.spellCastingAbilityId)!);
      return dc;
    }
  }
  return NaN;
}
