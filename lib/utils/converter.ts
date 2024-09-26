import { Ability } from "../models";

export const convertBeyondStatIdToAbility = (statId: number): Ability | null => {
  const statMap: { [key: number]: Ability } = {
    1: 'strength',
    2: 'dexterity',
    3: 'constitution',
    4: 'intelligence',
    5: 'wisdom',
    6: 'charisma'
  };

  return statMap[statId] ?? null;
}







