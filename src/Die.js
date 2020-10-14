"use strict";



class Die {
    #_dieType;
    #_dieValue;

    constructor(dieType) {
        this.#_dieType = dieType;
    }

    setDieType(value) {
        this.#_dieType = value;
    }

    getDieType() {
        return this.#_dieType;
    }

    setDieValue(value) {
        this.#_dieValue = value;
    }

    getDieValue() {
        return this.#_dieValue;
    }

    roll() {
        return (Number(Math.floor((Math.random() * this.#_dieType) + 1)));
    }

}

module.exports = Die;