"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DndCharacter = void 0;
var ac_1 = require("../parsers/ac");
var calculator_1 = require("../parsers/calculator");
var hp_1 = require("../parsers/hp");
var passive_1 = require("../parsers/passive");
var savingThrows_1 = require("../parsers/savingThrows");
var spells_1 = require("../parsers/spells");
// character.name -> string; // characters name
// character.avatarUrl -> string | null; // either url to avatar image or null
// character.level -> number; // characters level
// character.classes -> Array<DndClass>; // list of this characters classes
// character.profBonus -> number; // characters prof bonus
var DndCharacter = /** @class */ (function () {
    function DndCharacter(data) {
        this.id = data.id;
        this.name = data.name;
        this.avatarUrl = data.decorations.avatarUrl;
        this.level = (0, calculator_1.calculateTotalLevel)(data.classes);
        this.health = {
            current: (0, hp_1.getCurrentHP)(data),
            max: (0, hp_1.getMaxHP)(data),
        };
        this.ac = (0, ac_1.getAC)(data);
        this.classes = (0, calculator_1.getClasses)(data.classes);
        this.proficiencyBonus = (0, calculator_1.calculateProficiencyBonus)(this.level);
        this.initiativeBonus = (0, hp_1.getInitiativeBonus)(data);
        this.savingThrows = (0, savingThrows_1.getSavingThrows)(data);
        this.passiveScores = (0, passive_1.getPassives)(data);
        this.walkSpeed = data.race.weightSpeeds.normal.walk;
        this.casting = {
            dc: (0, spells_1.getSaveDC)(data)
        };
    }
    return DndCharacter;
}());
exports.DndCharacter = DndCharacter;
