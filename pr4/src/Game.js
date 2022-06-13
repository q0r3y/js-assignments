/*****************************************************************************************
*
*   Description:
*    This is a card game called: In-between. This class is the main game class that
*    creates a game object in order to play in-between.
*
*   Author: q0r3y
*
*   Date: 11.15.20
*
*   Revised:
*
*   Rules:
*    Each player places the ante in the pot. During the game each player takes turns,
*    the game continues until there is no money left in the pot.
*    During a turn, the dealer deals two cards, face-up.
*    The player then decides to bet if they believe
*    the third card dealt will be in between (in rank) their two cards.
*    A bet can be between zero or the total value of the pot.
*    If the third card is in-between, that player wins their bet from the pot.
*    If the third card is not in-between the two, that player pays to the pot their bet.
*    If the third card is the same rank as one of the two,
*    they pay to the pot double their bet.
*
*****************************************************************************************/

"use strict";

const PLAYER = require('./Player.js');
const DECK = require('./Deck.js');
const PROMPT = require('readline-sync');


class Game {

  #_players = [];
  #_potValue = 0;
  #_deck;
  #_playing = false;

  constructor(numPlayers) {
    const MAX_PLAYERS = 8;
    if (numPlayers <= MAX_PLAYERS) {
      for(let i = 1; i <= numPlayers; ++i) {
        let playerName = PROMPT.question(`\n - Player ${i} what is your name?: `);
        let ante = Number(PROMPT.question(` - How much would you like to place in the pot?: `));
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
    this.#_playing = true;
    while (this.#_playing) {
        for (let player of this.#_players) {
          if(this.#_potValue !== 0) {
          console.log(`\n ===== ${player.name}'s turn =====`);
          const draw = this.#_deck.drawCards(2);
          console.log(`\n - The dealer drew: ${Object.keys(draw[0].get('rank'))} of ${draw[0].get('suit')}`);
          console.log(` - The dealer drew: ${Object.keys(draw[1].get('rank'))} of ${draw[1].get('suit')}\n`);
          console.log(` - Total value of the pot: ${this.#_potValue}\n`);
          let bet = Number(PROMPT.question(` - ${player.name} how much would you like to bet?: `));
          bet = this.verifyInput(bet, player);
          const thirdCard = this.#_deck.drawCards(1);
          console.log(`\n - The third card is: ${Object.keys(thirdCard[0].get('rank'))} of ${thirdCard[0].get('suit')}\n`);
          const isCardBetween = this.isCardBetween(draw, thirdCard);
          this.setPlayerWinnings(player, isCardBetween, bet);
        } else {
          this.#_playing = false;
        }
      }
    }
    this.displayWinnings();
  }

  /*****************************************************************************
  * This function verifys the input for multiple places throughout the game
  * I wanted it to be useable in multiple situations rather than having to
  * have multiple seperate input-verify functions that are mostly the same
  * with only small differences.
  *****************************************************************************/
  verifyInput(input) {
    let chosen = false;
    while(!chosen) {
      if (isNaN(input)) {
        input = Number(PROMPT.question(` Invalid choice. You must chose a number: `));
      } else if (this.#_playing ? (input < 0 || input > this.#_potValue) : input < 0) {
        input = Number(PROMPT.question(` Invalid choice. Number must be 0 or above: `));
      } else {
        console.log(` - You've chosen: ${input}`);
        chosen = true;
        return input;
      }
    }
  }

  /**********************************************************************************************************
  * Creates a comparion array with all 3 card values, sorts the array by value, compares the 3rd card value
  * against array position values in order to determine where the 3rd card lies in comparison to the others.
  * It then returns an integer that coorelates to the answer
  * 1 = The card is between
  * 2 = The card is not between
  * 3 = The card is equal to one of the others
  **********************************************************************************************************/
  isCardBetween(draw, thirdCard) {
    const firstCardValue = Object.values(draw[0].get('rank'))[0];
    const secondCardValue = Object.values(draw[1].get('rank'))[0];
    const thirdCardValue = Object.values(thirdCard[0].get('rank'))[0];
    const comparisonArray = [firstCardValue, secondCardValue, thirdCardValue].sort((a,b) => { return a - b });
    if (thirdCardValue === comparisonArray[1]) { // The third card value is between the other card values
      if (thirdCardValue === comparisonArray[0] || thirdCardValue === comparisonArray[2]) {
        console.log(` ! The third card was equal to one of the others.`);
        return 3;
      } else {
        console.log(` ! Third card IS between.`);
        return 1;
      }
    } else {
      console.log(` ! Third card IS NOT between.`);
      return 2;
    }
  }

  setPlayerWinnings(player, isCardBetween, bet) {
    switch (isCardBetween) {
      case 1:
        console.log(` - You win your bet from the pot!`);
        player.winnings += bet;
        this.#_potValue -= bet;
        console.log(` ** ${player.name}'s winnings = ${player.winnings} **`);
        break;
      case 2:
        console.log(` - You pay your bet to the pot!`);
        player.winnings -= bet;
        this.#_potValue += bet;
        console.log(` ** ${player.name}'s winnings = ${player.winnings} **`);
        break;
      case 3:
        console.log(` - You pay double your bet to the pot!`);
        player.winnings -= bet*2;
        this.#_potValue += bet*2;
        console.log(` ** ${player.name}'s winnings = ${player.winnings} **`);
        break;
    };
  }

  displayWinnings() {
    console.log(`\n - The pot value is ${this.#_potValue}.`);
    for (let player of this.#_players) {
      console.log(` ** ${player.name}'s winnings = ${player.winnings} **`);
    }
    console.log(` **** Game Over ****`);
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
