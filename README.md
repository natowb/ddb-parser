# @natowb/ddb-parser
a simple parser of dnd beyond character json


## Usage
```ts
import { DndCharacter } from "@natowb/ddb-parser";
  // data can be retrieved by calling the character-service api of dnd beyond
  // https://character-service.dndbeyond.com/character/v5/character/<id>

  const character = new DndCharacter(data)
```

## DndCharacter Class

```ts
class DndCharacter {
  id: string;
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
  initiativeBonus: number;
}

```
