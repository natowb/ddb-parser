import { describe, expect, it } from "@jest/globals";
import { Ability } from "../models";
import { convertBeyondStatIdToAbility } from "./converter";


interface TestDataType {
  value: number;
  expected: Ability;
}

describe('converter', () => {
  it('should return correct ability for 1-6', () => {

  });

  it('should return the correct proficiency bonus for levels 1-4', () => {

    [
      { value: 1, expected: 'strength' },
      { value: 2, expected: 'dexterity' },
      { value: 3, expected: 'constitution' },
      { value: 4, expected: 'intelligence' },
      { value: 5, expected: 'wisdom' },
      { value: 6, expected: 'charisma' }
    ].forEach(data => {
      expect(convertBeyondStatIdToAbility(data.value)).toBe(data.expected);
    })

  });


  it('should return null for any other numbers', () => {
    expect(convertBeyondStatIdToAbility(0)).toBeNull();
  })


})
