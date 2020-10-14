/**
 * Assignment9 Player Class
 * Creates a Player object
 *
 * @ q0r3y
 * @ 05.08.20
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