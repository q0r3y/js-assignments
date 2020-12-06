/*******************************************************************************
*
*   Description:
*    This class creates a deck array of 52 cards and shuffles the deck using the
*    Durstenfeld shuffle algorithm
*
*   Author: q0r3y
*
*   Date: 11.15.20
*
*   Revised: 12.04.20
*
*******************************************************************************/

"use strict";

import CARD from "./Card.js";

export default class Deck {

    _cardArray = [];

    constructor() {
        console.log(`constructing deck.`);
        this.buildDeck();
        this.shuffleDeck();
    }

    /**
     *  @desc Builds the Deck array with 4 suits of every rank. The rank value is the card value.
     */
    buildDeck() {
        const spades = '\u2660';
        const hearts = '\u2665';
        const diamonds = '\u2666';
        const clubs = '\u2663';

        const SUITS = [spades, hearts, diamonds, clubs];
        const RANKS = [
            {'rank' : '2', 'value' : 2}, {'rank' : '3', 'value' : 3},
            {'rank' : '4', 'value' : 4}, {'rank' : '5', 'value' : 5},
            {'rank' : '6', 'value' : 6}, {'rank' : '7', 'value' : 7},
            {'rank' : '8', 'value' : 8}, {'rank' : '9', 'value' : 9},
            {'rank' : '10', 'value' : 10}, {'rank' : 'J', 'value' : 11},
            {'rank' : 'Q', 'value' : 12}, {'rank' : 'K', 'value' : 13},
            {'rank' : 'A', 'value' : 14}
            ];

        for (let suit of SUITS) {
            for (let rank of RANKS) {
                const card = new CARD(rank,suit);
              //  console.log(card);
                this._cardArray.push(card);
            }
        }
    }

    /**
     * @desc Randomize array in-place using Durstenfeld shuffle algorithm
     */
    shuffleDeck() {
        for (let i = this._cardArray.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [this._cardArray[i], this._cardArray[rand]] = [this._cardArray[rand], this._cardArray[i]];
        }
    }

    /**
     *  @desc Returns an array of specified number of cards off the deck
     */
    drawCards(numCards) {
        let drawArray = [];
        for (let i = 1; i <= numCards; i++) {
            let drawnCard = this._cardArray.pop();
            if (typeof(drawnCard) === 'undefined') {
                console.log(` [*] Ran out of cards. Rebuilding and shuffling deck..`);
                this.buildDeck();
                this.shuffleDeck();
                drawnCard = this._cardArray.pop();
            }
            drawArray.push(drawnCard);
        }
        return drawArray;
    }

    get cardArray() {
        return this._cardArray;
    }

    set cardArray(value) {
        this._cardArray = value;
    }
}
