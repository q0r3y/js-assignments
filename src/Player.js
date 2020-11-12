/**
 * PLayer Class
 * Creates a Player object
 *
 * @ q0r3y
 * @ 11.06.20
 */

class Player {

    #_cash = 0;
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

    get cash() {
        return this.#_cash;
    }

    set cash(value) {
        this.#_cash = value;
    }



}

module.exports = Player;
