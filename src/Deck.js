"use strict";

class Deck {

    #_cardArray = [];

    constructor() {
        this.buildDeck();
        this.shuffleDeck();
    }

    /* Builds the Deck array with 4 suits of every rank. The rank includes the card value. */
    buildDeck() {

        const SUITS = ['SPADES', 'DIAMONDS', 'CLUBS', 'HEARTS'];
        const RANKS = [
            {'DEUCE' : 2}, {'THREE' : 3}, {'FOUR' : 4}, {'FIVE' : 5},
            {'SIX' : 6}, {'SEVEN' : 7}, {'EIGHT' : 8}, {'NINE' : 9},
            {'TEN' : 10}, {'JACK' : 11}, {'QUEEN' : 12}, {'KING' : 13},
            {'ACE' : 14}];

        for (let suit of SUITS) {
            for (let rank of RANKS) {
                const card = new Map().set('rank', rank).set('suit', suit);
                this.#_cardArray.push(card);
            }
        }
    }

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    shuffleDeck() {
        for (let i = this.#_cardArray.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [this.#_cardArray[i], this.#_cardArray[rand]] = [this.#_cardArray[rand], this.#_cardArray[i]];
        }
    }

    /* Returns an array of specified number of cards off the deck */
    getCards(numCards) {
        let drawArray = [];
        for (let i = 1; i <= numCards; i++) {
            let drawnCard = this.#_cardArray.pop();
            if (typeof(drawnCard) === 'undefined') {
                console.log(`Ran out of cards. Rebuilding and shuffling deck..`);
                this.buildDeck();
                this.shuffleDeck();
                drawnCard = this.#_cardArray.pop();
            }
            drawArray.push(drawnCard);
        }
        return drawArray;
    }

    get cardArray() {
        return this.#_cardArray;
    }

    set cardArray(value) {
        this.#_cardArray = value;
    }


}
// {
//     const DECK = new Deck();
// }
module.exports = Deck;