/*******************************************************************************
*
*   Description:
*    Player class used to create a player object for the in-between card game.
*
*   Author: q0r3y
*
*   Date: 11.15.20
*
*   Revised: 12.04.20
*
*******************************************************************************/

export default class Player {

    _cash = 0;
    _name;

    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get cash() {
        return this._cash;
    }

    set cash(value) {
        this._cash = value;
    }
}