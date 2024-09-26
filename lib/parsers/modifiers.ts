
import { Ability } from "../models";
import { CharacterData, DDBModifier, DDBModifiers } from "../models";
import { calculateModifier } from "./calculator";

export const sumAllModifiersOfType = (modifiers: DDBModifiers, type: string, subType: string): number => {
  const combined = [
    ...modifiers.class,
    ...modifiers.race,
    ...modifiers.item,
    ...modifiers.condition,
    ...modifiers.background
  ];
  return sumModifiersOfType(combined, type, subType);
}


export const sumModifiersOfType = (modifiers: DDBModifier[], type: string, subType: string | null = null): number => {
  const filtered = getModifiersOfType(modifiers, type, subType);
  const values = filtered.map(modifier => modifier.value);
  return values.reduce((sum, value) => sum + value, 0);
}


export const getModifiersOfType = (modifiers: DDBModifier[],
  type: string, subType: string | null = null): DDBModifier[] => {
  let filtered = modifiers.filter((item: DDBModifier) => {

    return item.type && item.type === type;
  });

  if (subType) {
    filtered = filtered.filter((item: DDBModifier) => {
      return item.subType && item.subType === subType;
    });
  }
  return filtered;

}

export const getAllModifiersOfType = (modifiers: DDBModifiers, type: string, subType: string): DDBModifier[] => {
  const combined = [
    ...modifiers.class,
    ...modifiers.race,
    ...modifiers.item,
    ...modifiers.condition,
    ...modifiers.background
  ];
  return getModifiersOfType(combined, type, subType);
}


/**
 *  Takes the base modifiers object from the json and checks all entries in it. ie modifiers.race
 * 
 *
 * */




export const getAbilityScoreModifier = (character: CharacterData, statName: Ability): number => {
  const statMap: { [key: number]: Ability } = {
    1: 'strength',
    2: 'dexterity',
    3: 'constitution',
    4: 'intelligence',
    5: 'wisdom',
    6: 'charisma'
  };

  let abilityScoreId: number | null = null;

  for (const dndbeyondId in statMap) {
    const allowedStat = statMap[dndbeyondId];
    if (statName === allowedStat) {
      abilityScoreId = Number(dndbeyondId);
      break;
    }
  }

  if (!abilityScoreId) {
    return 0;
  }

  const abilityScoreBonuses = sumAllModifiersOfType(character.modifiers, 'bonus', statMap[abilityScoreId] + '-score');
  let abilityScoreValue = 0;


  // is this state overriding;
  const overridingStat = character.overrideStats.find((oStat) => oStat.id === abilityScoreId && oStat.value !== null);
  if (overridingStat && overridingStat.value) {
    abilityScoreValue = overridingStat.value;
  } else {
    const baseStat = character.stats.find((nStat) => nStat.id === abilityScoreId && nStat.value !== null);
    if (baseStat && baseStat.value) {
      abilityScoreValue = baseStat.value;
    }
  }

  return calculateModifier(abilityScoreValue + abilityScoreBonuses);


}
