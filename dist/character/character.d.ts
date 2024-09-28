import { CharacterData, PassiveScores, SavingThrows } from "../models";
export type DndClass = {
    level: number;
    name: string;
    subclass: string | null;
};
type DndHealth = {
    current: number;
    max: number;
};
export declare class DndCharacter {
    id: number;
    name: string;
    avatarUrl: string | null;
    level: number;
    health: DndHealth;
    ac: number;
    proficiencyBonus: number;
    savingThrows: SavingThrows;
    passiveScores: PassiveScores;
    walkSpeed: number;
    classes: DndClass[];
    casting: {
        dc: number;
    };
    senses: {
        darkvision: number;
    };
    initiativeBonus: number;
    constructor(data: CharacterData);
}
export {};
