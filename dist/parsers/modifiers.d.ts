import { Ability } from "../models";
import { CharacterData, DDBModifier, DDBModifiers } from "../models";
export declare const sumAllModifiersOfType: (modifiers: DDBModifiers, type: string, subType: string) => number;
export declare const sumModifiersOfType: (modifiers: DDBModifier[], type: string, subType?: string | null) => number;
export declare const maxModifierOfType: (modifiers: DDBModifier[], type: string, subType?: string | null) => number;
export declare const maxAllModifierOfType: (modifiers: DDBModifiers, type: string, subType: string) => number;
export declare const getModifiersOfType: (modifiers: DDBModifier[], type: string, subType?: string | null) => DDBModifier[];
export declare const getAllModifiersOfType: (modifiers: DDBModifiers, type: string, subType: string) => DDBModifier[];
/**
 *  Takes the base modifiers object from the json and checks all entries in it. ie modifiers.race
 *
 *
 * */
export declare const getAbilityScoreModifier: (character: CharacterData, statName: Ability) => number;
