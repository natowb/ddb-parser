import { DndClass } from "../character/character";
import { DDBClass } from "../models";

export const calculateTotalLevel = (classes: Array<DDBClass>): number => {
  const level = Object.values(classes).reduce((acc, curr) => acc + curr.level, 0);
  return Math.max(1, Math.min(level, 20));
}

export const getClasses = (classes: Array<DDBClass>): DndClass[] => {
  return classes.map((ddb) => {
    const result: DndClass = {
      level: ddb.level,
      name: ddb.definition.name,
      subclass: ddb.subclassDefinition?.name,
    }
    return result;
  })
}

export const calculateProficiencyBonus = (level: number): number => {
  const skillProficiencyByLevel = [
    2, 2, 2, 2,
    3, 3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5,
    6, 6, 6, 6,
  ];

  return skillProficiencyByLevel[level - 1];
}



export const calculateModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
}
