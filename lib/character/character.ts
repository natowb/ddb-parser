import { CharacterData, PassiveScores, SavingThrows } from "../models";
import { getAC } from "../parsers/ac";
import { calculateProficiencyBonus, calculateTotalLevel, getClasses } from "../parsers/calculator";
import { getCurrentHP, getInitiativeBonus, getMaxHP } from "../parsers/hp";
import { getPassives } from "../parsers/passive";
import { getSavingThrows } from "../parsers/savingThrows";
import { getDarkvisionInFt } from "../parsers/senses";
import { getSaveDC } from "../parsers/spells";
export type DndClass = {
  level: number;
  name: string;
  subclass: string | null;
}
type DndHealth = {
  current: number;
  max: number;
}

// character.name -> string; // characters name
// character.avatarUrl -> string | null; // either url to avatar image or null
// character.level -> number; // characters level
// character.classes -> Array<DndClass>; // list of this characters classes
// character.profBonus -> number; // characters prof bonus

export class DndCharacter {
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
  }
  senses: {
    darkvision: number;
  }
  initiativeBonus: number;
  constructor(data: CharacterData) {
    this.id = data.id;
    this.name = data.name;
    this.avatarUrl = data.decorations.avatarUrl;
    this.level = calculateTotalLevel(data.classes);
    this.health = {
      current: getCurrentHP(data),
      max: getMaxHP(data),
    }
    this.ac = getAC(data);
    this.classes = getClasses(data.classes);
    this.proficiencyBonus = calculateProficiencyBonus(this.level);
    this.initiativeBonus = getInitiativeBonus(data);
    this.savingThrows = getSavingThrows(data);
    this.passiveScores = getPassives(data);
    this.walkSpeed = data.race.weightSpeeds.normal.walk;
    this.casting = {
      dc: getSaveDC(data)
    }
    this.senses = {
      darkvision: getDarkvisionInFt(data)
    }
  }
}
