import { CharacterData } from "../models";
import { maxAllModifierOfType } from "./modifiers";

export const getDarkvisionInFt = (character: CharacterData) => {
  const darkVisionValue = maxAllModifierOfType(character.modifiers, "set-base", "darkvision");
  return darkVisionValue;
}
