import { CharacterData } from "../models";
export declare const ARMOR_TYPE_LIGHT = 1;
export declare const ARMOR_TYPE_MEDIUM = 2;
export declare const ARMOR_TYPE_HEAVY = 3;
export declare const ARMOR_TYPE_SHIELD = 4;
export declare const getArmorClassBonus: (character: CharacterData) => number;
