import { DndCharacter } from "../character/character";
import { CharacterData, PassiveScores } from "../models";
import { calculateProficiencyBonus, calculateTotalLevel } from "./calculator";
import { getAbilityScoreModifier, getAllModifiersOfType } from "./modifiers";


export const getPassives = (character: CharacterData): PassiveScores => {
  return {
    perception: getPassiveScore(character, 'perception'),
    insight: getPassiveScore(character, 'insight'),
    investigation: getPassiveScore(character, 'investigation')
  }

}


const getPassiveScore = (character: CharacterData, proficiencyName: string): number => {
  let statMod = 0;
  switch (proficiencyName) {
    case 'insight':
    case 'perception':
      statMod = getAbilityScoreModifier(character, 'wisdom');
      break;
    case 'investigation':
      statMod = getAbilityScoreModifier(character, 'intelligence');
      break;
    default:
      statMod = 0;
  }

  let skillMod = 0;

  const activeBonuses = getAllModifiersOfType(character.modifiers, 'proficiency', `${proficiencyName}-saving-throws`);
  if (activeBonuses.length > 0) {
    skillMod = calculateProficiencyBonus(calculateTotalLevel(character.classes));
  }

  const passiveBonuses = getAllModifiersOfType(character.modifiers, 'bonus', `passive-${proficiencyName}`);
  skillMod += passiveBonuses.reduce((sum, bonus) => sum + bonus.value, 0);

  return 10 + statMod + skillMod;
}



