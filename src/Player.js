/**
 *   @author: q0r3y
 *   @version: 0.0.1
 *   @summary: Player class
 *   @todo
 */

class Player {

    #_totalPoints = 0;
    #_turnPoints = 0;
    #_name;

    constructor(name) {
        this.#_name = name;
    }

    getName() {
        return this.#_name;
    }

    setName(value) {
        this.#_name = value;
    }

    getTotalPoints() {
        return this.#_totalPoints;
    }

    setTotalPoints(value) {
        this.#_totalPoints = value;
    }

    getTurnPoints() {
        return this.#_turnPoints;
    }

    setTurnPoints(value) {
        this.#_turnPoints = value;
    }

}

module.exports = Player;
