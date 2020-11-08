"use strict";

const PLAYER = require('./Player.js');
const DECK = require('./Deck.js');
const PROMPT = require('readline-sync');

/*
* Each player places the ante in the pot. During the game each player takes turns,
* the game continues until there is no money left in the pot.
* During a turn, the dealer deals two cards, face-up. The player then decides to bet if they believe
* the third card dealt will be in between (in rank) their two cards.
* A bet can be between zero or the total value of the pot.
* If the third card is in-between, that player wins their bet from the pot.
* If the third card is not in-between the two, that player pays to the pot their bet.
* If the third card is the same rank as one of the two, they pay to the pot double their bet.
 */

class Game {

    #_players = [];
    #_potValue = 0;
    #_deck;

    constructor(numPlayers) {
        if (numPlayers <= 8) {
            for(let i = 1; i <= numPlayers; ++i) {
                let playerName = PROMPT.question(`Player ${i} what is your name?: `);
                let ante = Number(PROMPT.question(`How much would you like to place in the pot?: `));
                ante = this.verifyInput(ante);
                this.#_potValue += ante;
                this.#_players.push(new PLAYER(playerName));
            }
            this.#_deck = new DECK();
            this.playGame();
        } else {
            console.log("This game has a limit of 8 players.");
        }
    }

    playGame() {
        let playing = true;
        while (playing) {
            while(this.#_potValue !== 0) {
                for (let player of this.#_players) {
                    const draw = this.#_deck.getCards(2);
                    console.log(`\nThe dealer drew: ${Object.keys(draw[0].get('rank'))} of ${draw[0].get('suit')}`);
                    console.log(`The dealer drew: ${Object.keys(draw[1].get('rank'))} of ${draw[1].get('suit')}\n`);
                    console.log(`Total value of the pot: ${this.#_potValue}\n`);
                    let bet = Number(PROMPT.question(`${player.name} - how much would you like to bet?: `));
                    bet = this.verifyInput(bet, player);
                    const thirdCard = this.#_deck.getCards(1);
                    console.log(`\nThe third card is: ${Object.keys(thirdCard[0].get('rank'))} of ${thirdCard[0].get('suit')}\n`)
                    const between = this.compareCards(draw, thirdCard);
                }
                //console.log(roundDraw);
            }

        }
        // print play another round message
        // Set change play variable
    }

    verifyInput(input) {
        let chosen = false;
        while(!chosen) {
            if (isNaN(input)) {
                input = Number(PROMPT.question(`Invalid choice. You must chose a number: `));
            } else if (input < 0) {
                input = Number(PROMPT.question(`Invalid choice. Number must be 0 or above: `));
            } else {
                console.log(`You've chosen: ${input}`);
                chosen = true;
                return input;
            }
        }
    }

    compareCards(draw, thirdCard) {
        const firstCardValue = Object.values(draw[0].get('rank'))[0];
        const secondCardValue = Object.values(draw[1].get('rank'))[0];
        const thirdCardValue = Object.values(thirdCard[0].get('rank'))[0];
        const compareArr = [firstCardValue, secondCardValue, thirdCardValue].sort((a,b) => { return a - b });
        // If the third card value is between the first and second card value
        if (thirdCardValue === compareArr[1]) {
            if (thirdCardValue === compareArr[0] || thirdCardValue === compareArr[2]) {
                console.log(` the third card is the same rank as one of the two, they pay to the pot double their bet.`);
            } else {
                console.log(`Third card IS between`);
                return true;
            }

        } else {
            console.log(`Third card IS NOT between`);
            return false;
        }
    }

    get players() {
        return this.#_players;
    }

    set players(value) {
        this.#_players = value;
    }

}
{
    const GAME = new Game(2);
}