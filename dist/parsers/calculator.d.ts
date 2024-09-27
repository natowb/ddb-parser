import { DndClass } from "../character/character";
import { DDBClass } from "../models";
export declare const calculateTotalLevel: (classes: Array<DDBClass>) => number;
export declare const getClasses: (classes: Array<DDBClass>) => DndClass[];
export declare const calculateProficiencyBonus: (level: number) => number;
export declare const calculateModifier: (score: number) => number;
