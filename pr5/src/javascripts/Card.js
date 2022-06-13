"use strict";

export default class Card {

    rank;
    suit;
    color;

    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        // If suit is hearts /
        this.color = (suit === '\u2666' || suit === '\u2665') ? 'red' : 'black';
    }

    get suit() {
        return this.suit;
    }

    set suit(suit) {

    }

    get color() {
        return this.color;
    }

    get html() {
        let innerText = this.rank.rank;
        innerText += this.suit;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-value');
        cardDiv.classList.add(`${this.color}`);
        cardDiv.innerText = innerText;
        console.log(cardDiv);
        return cardDiv;
    }

}