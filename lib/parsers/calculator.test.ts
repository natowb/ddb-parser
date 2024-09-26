import { describe, it, expect } from "@jest/globals";
import { calculateTotalLevel, calculateProficiencyBonus, calculateModifier } from './calculator'; // Update with the correct path
import type { DDBClass } from "../models";

describe('calculateTotalLevel', () => {
  it('should correctly sum the levels of multiple classes', () => {
    const classes: Array<DDBClass> = [
      {
        level: 3,
        definition: {
          hitDice: 0,
          canCastSpells: false,
          spellCastingAbilityId: 0,
          name: ""
        },
        subclassDefinition: {
          hitDice: 0,
          canCastSpells: false,
          spellCastingAbilityId: 0,
          name: ""
        },
        isStartingClass: false
      },
      {
        level: 2,
        definition: {
          hitDice: 0,
          canCastSpells: false,
          spellCastingAbilityId: 0,
          name: ""
        },
        subclassDefinition: {
          hitDice: 0,
          canCastSpells: false,
          spellCastingAbilityId: 0,
          name: ""
        },
        isStartingClass: false
      },
      {
        level: 5,
        definition: {
          hitDice: 0,
          canCastSpells: false,
          spellCastingAbilityId: 0,
          name: ""
        },
        subclassDefinition: {
          hitDice: 0,
          canCastSpells: false,
          spellCastingAbilityId: 0,
          name: ""
        },
        isStartingClass: false
      },
    ];
    expect(calculateTotalLevel(classes)).toBe(10);
  });

  it('should handle a single class correctly', () => {
    const classes = [{
      level: 4,
      definition: {
        hitDice: 0,
        canCastSpells: false,
        spellCastingAbilityId: 0,
        name: ""
      },
      subclassDefinition: {
        hitDice: 0,
        canCastSpells: false,
        spellCastingAbilityId: 0,
        name: ""
      },
      isStartingClass: false
    }];
    expect(calculateTotalLevel(classes)).toBe(4);
  });

  it('should handle an empty array and return the minimum level of 1', () => {
    const classes: any[] = [];
    expect(calculateTotalLevel(classes)).toBe(1);
  });

  it('should not allow levels to exceed 20', () => {
    const classes = [
      {
        level: 10,
        definition: {
          hitDice: 0,
          canCastSpells: false,
          spellCastingAbilityId: 0,
          name: ""
        },
        subclassDefinition: {
          hitDice: 0,
          canCastSpells: false,
          spellCastingAbilityId: 0,
          name: ""
        },
        isStartingClass: false
      },
      {
        level: 15,
        definition: {
          hitDice: 0,
          canCastSpells: false,
          spellCastingAbilityId: 0,
          name: ""
        },
        subclassDefinition: {
          hitDice: 0,
          canCastSpells: false,
          spellCastingAbilityId: 0,
          name: ""
        },
        isStartingClass: false
      }
    ];
    expect(calculateTotalLevel(classes)).toBe(20);
  });

  it('should handle a case where the total level is less than 1', () => {
    const classes = [{
      level: -5,
      definition: {
        hitDice: 0,
        canCastSpells: false,
        spellCastingAbilityId: 0,
        name: ""
      },
      subclassDefinition: {
        hitDice: 0,
        canCastSpells: false,
        spellCastingAbilityId: 0,
        name: ""
      },
      isStartingClass: false
    }];
    expect(calculateTotalLevel(classes)).toBe(1);
  });
});

describe('calculateProficiencyBonus', () => {
  it('should return the correct proficiency bonus for levels 1-4', () => {
    [1, 2, 3, 4].forEach(level => {
      expect(calculateProficiencyBonus(level)).toBe(2);
    });
  });

  it('should return the correct proficiency bonus for levels 5-8', () => {
    [5, 6, 7, 8].forEach(level => {
      expect(calculateProficiencyBonus(level)).toBe(3);
    });
  });

  it('should return the correct proficiency bonus for levels 9-12', () => {
    [9, 10, 11, 12].forEach(level => {
      expect(calculateProficiencyBonus(level)).toBe(4);
    });
  });

  it('should return the correct proficiency bonus for levels 13-16', () => {
    [13, 14, 15, 16].forEach(level => {
      expect(calculateProficiencyBonus(level)).toBe(5);
    });
  });

  it('should return the correct proficiency bonus for levels 17-20', () => {
    [17, 18, 19, 20].forEach(level => {
      expect(calculateProficiencyBonus(level)).toBe(6);
    });
  });

  it('should handle the minimum level case (1)', () => {
    expect(calculateProficiencyBonus(1)).toBe(2);
  });

  it('should handle the maximum level case (20)', () => {
    expect(calculateProficiencyBonus(20)).toBe(6);
  });
});


describe('calculateModifier', () => {
  it('should return 5 for a score of 20', () => {
    expect(calculateModifier(20)).toBe(5);
  })
})
