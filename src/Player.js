/*******************************************************************************
*
*   Description:
*    Player class used to create a player object for the in-between card game.
*
*   Author: q0r3y
*
*   Date: 11.15.20
*
*   Revised:
*
*******************************************************************************/

class Player {

    #_winnings = 0;
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

    get winnings() {
        return this.#_winnings;
    }

    set winnings(value) {
        this.#_winnings = value;
    }
}
module.exports = Player;
