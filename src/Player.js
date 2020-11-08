/**
 * PLayer Class
 * Creates a Player object
 *
 * @ q0r3y
 * @ 11.06.20
 */

class Player {

    #_totalPoints = 0;
    #_name;

    constructor(name) {
        this.#_name = name;
    }

    get name() {
        return this.#_name;
    }

    set name(value) {
        this.#_name = value;
    }

    getTotalPoints() {
        return this.#_totalPoints;
    }

    setTotalPoints(value) {
        this.#_totalPoints = value;
    }



}

module.exports = Player;