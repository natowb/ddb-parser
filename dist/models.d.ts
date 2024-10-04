export interface DDBModifier {
    type: string;
    subType: string;
    value: number;
    statId?: number;
}
export interface DDBClass {
    definition: ClassDefinition;
    subclassDefinition: ClassDefinition;
    level: number;
    isStartingClass: boolean;
}
export interface DDBModifiers {
    race: Array<DDBModifier>;
    class: Array<DDBModifier>;
    background: Array<DDBModifier>;
    item: Array<DDBModifier>;
    condition: Array<DDBModifier>;
    feat: Array<DDBModifier>;
}
export interface ItemDefinition {
    filterType: string;
    armorClass?: number;
    armorTypeId?: number;
    grantedModifiers: Array<DDBModifier>;
}
export interface ClassDefinition {
    hitDice: number;
    canCastSpells: boolean;
    spellCastingAbilityId: number;
    name: string;
}
export interface CharacterData {
    id: number;
    name: string;
    decorations: {
        avatarUrl: string | null;
    };
    overrideStats: Array<{
        id: number;
        value: number | null;
    }>;
    stats: Array<{
        id: number;
        value: number;
    }>;
    modifiers: DDBModifiers;
    inventory: Array<{
        equipped: boolean;
        definition: ItemDefinition;
    }>;
    overrideHitPoints: number | null;
    preferences?: {
        hitPointType?: any;
    };
    classes: Array<DDBClass>;
    race: {
        weightSpeeds: {
            normal: {
                walk: number;
                fly: number;
                burrow: number;
                swim: number;
                climb: number;
            };
        };
    };
    baseHitPoints?: number;
    bonusHitPoints?: number;
    removedHitPoints?: number;
}
export type Ability = "strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma";
export interface SavingThrows {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}
export interface PassiveScores {
    perception: number;
    insight: number;
    investigation: number;
}
