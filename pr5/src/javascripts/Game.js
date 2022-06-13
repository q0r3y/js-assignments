/*****************************************************************************************
 *
 *   Description:
 *    This is a card game called: In-between. This class is the main game class that
 *    creates a game object in order to play in-between.
 *
 *   Author: q0r3y
 *
 *   Date: 12.06.20
 *
 *   Revised: Added GUI
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

import PLAYER from "./Player.js";
import DECK from "./Deck.js";
import MAIN from "./main.js";
import Fireworks from "./Fireworks.js";

export default class Game {

  _player1;
  _player2;
  _potValue = 0;
  _deck;
  _playing = false;
  _newGame = true;
  _currentPlayer;
  _draw;

  /**
   * @constructor
   */
  constructor() {
    new MAIN();
    MAIN.stopEnterKey();
    this._deck = new DECK();
    this.createPlayers();

   this.initGame();
   this.gameListener();
  }

  /**
   * @desc Initializes the beginning game state.
   * @returns {void}
   */
  initGame() {
    this._currentPlayer = this._player1;
    this.setPlayerInfo();
  }

  /**
   * @desc Creates 2 players
   * @returns {void}
   */
  createPlayers() {
    this._player1 = new PLAYER(`Player1`);
    this._player2 = new PLAYER(`Player2`);
  }

  /**
   * @desc The game event listener that waits for a button press
   * @returns {void}
   */
  gameListener() {
    document.getElementById('button').addEventListener('click',  () => {
      let input = new FormData(document.getElementById('game-input')).get('input').replace(/\s/g,'');
      this.gameHandler(input)
    });
  }

  /**
   * @desc The main event driven game logic that is called when the button is clicked.
   * @param {string} - Input gathered from the game-input box
   * @returns {void}
   */
  gameHandler(input) {
    if (this.verifyInput(input)) {
      if (this._newGame !== true) {
        const bet = Number(input);
        const thirdCard = this._deck.drawCards(1);
        const isCardBetween = this.isCardBetween(thirdCard);

        this.displayCard(thirdCard[0], 'card3');
        this.setCashAmounts(isCardBetween, bet);
        if (this._potValue !== 0) {
          setTimeout(() => {
            this.clearCards();
            this.stepGame();
          }, 2500); // Pauses briefly between rounds
        } else {
          setTimeout(() => {
            this.endGame();
          }, 2500);
        }
      } else {
        this.setPlayerAntes(input);

        if (this._currentPlayer === this._player1) {
          let gameText = document.getElementById('game-text');
          gameText.innerText = `Player2: Input your ante for the pot`;
          this.changeCurrentPlayer();
        } else {
          this._newGame = false;
          this._playing = true;
          this.stepGame();
        }
        this.setPlayerInfo();
      }
    }
  }

  /**
   * @desc This method is used to step the game state
   * @returns {void}
   */
  stepGame() {
    this._draw = this._deck.drawCards(2);
    this.changeCurrentPlayer();
    this.setPlayerInfo();
    this.setGameText();
    this.displayCard(this._draw[0], 'card1');
    this.displayCard(this._draw[1], 'card2');
    //console.log(this._currentPlayer.name);
  }

  /**
   * @desc Changes the current player
   * @returns {void}
   */
  changeCurrentPlayer() {
    if (this._currentPlayer === this._player2) {
      //console.log(`Changing current player to: Player1`);
      this._currentPlayer = this._player1;
    } else {
      //console.log(`Changing current player to: Player2`);
      this._currentPlayer = this._player2;
    }
  }

  /**
   * @desc Sets the player information boxes
   * @returns {void}
   */
  setPlayerInfo() {
    //console.log(`setPlayerStatInfo(). Current player is: ${this.currentPlayer.name}`);

    const player1NameElement = document.getElementById('player1-name');
    const player2NameElement = document.getElementById('player2-name');
    const player1CashElement = document.getElementById('player1-cash');
    const player2CashElement = document.getElementById('player2-cash');

    const potValueElement = document.getElementById('pot-value');
    potValueElement.innerText = `Current pot value: ${this._potValue}`;

    player1NameElement.innerText = `${this._player1.name}`;
    player2NameElement.innerText = `${this._player2.name}`;

    player1CashElement.innerText = `Cash: ${this._player1.cash}`;
    player2CashElement.innerText = `Cash: ${this._player2.cash}`;

  }

  /**
   * @desc Used in the beginning to set player antes
   * @param {number} - Input ante
   * @returns {void}
   */
  setPlayerAntes(ante) {
    //console.log(`${this._currentPlayer.name} ante: ${ante}`)
    this._potValue += Number(ante);
  }

  /**
   * @desc Sets the game text
   * @returns {void}
   */
  setGameText() {
    let gameText = document.getElementById('game-text');
    const gameInput = document.getElementById('game-input');
    gameText.innerHTML = `${this._currentPlayer.name}: Input your bet`;
    if (gameInput.style.visibility === "hidden") {
      gameInput.style.visibility = 'visible';
    }
  }

  /**
   * @desc This function verifies the input for multiple places throughout the game
   *        I wanted it to be usable in multiple situations rather than having to
   *        have multiple separate input-verify functions that are mostly the same
   *        with only small differences.
   *
   * @param {string} - Input string
   *
   * @returns {input} - Verified input information meets all criteria
   */
  verifyInput(input) {
    let inputTextBox = document.getElementById('input-box');
    let errorText = document.getElementById('error-text');
    if (isNaN(input)) {
      errorText.style.visibility = 'visible';
      errorText.innerText = `Invalid choice. You must chose a number.`;
    } else if (this._playing ? (input < 0 || input > this._potValue) : input < 0) {
      errorText.style.visibility = 'visible';
      errorText.innerText = `Invalid choice. Ante must be >= 0`;
      if (this._playing) {errorText.innerText = `Invalid choice. Number must be >= 0 and <= pot value.`;}
    } else if (input.length === 0) {
      errorText.style.visibility = 'visible';
      errorText.innerText = `You need to choose something.`;
    } else {
      //console.log(` - You've chosen: ${input}`);
      errorText.style.visibility = 'hidden';
      inputTextBox.value = '';
      return input;
    }
  }

  /**
   * @desc Creates a comparison array with all 3 card values, sorts the array by value, compares the 3rd card value
   *       against array position values in order to determine where the 3rd card lies in comparison to the others.
   *       It then returns an integer that correlates to the answer
   *
   * @param {array} - Card array
   *
   * @returns {number} - 1 = The card is between
   *                     2 = The card is not between
   *                     3 = The card is equal to one of the others
   */
  isCardBetween(thirdCard) {
    const firstCardValue = this._draw[0].rank.value;
    const secondCardValue = this._draw[1].rank.value;
    const thirdCardValue = thirdCard[0].rank.value;
    const comparisonArray = [firstCardValue, secondCardValue, thirdCardValue].sort((a,b) => { return a - b });
    if (thirdCardValue === comparisonArray[1]) { // The third card value is between the other card values
      if (thirdCardValue === comparisonArray[0] || thirdCardValue === comparisonArray[2]) {
        //console.log(` ! The third card was equal to one of the others.`);
        return 3;
      } else {
        //console.log(` ! Third card IS between.`);
        return 1;
      }
    } else {
      //console.log(` ! Third card IS NOT between.`);
      return 2;
    }
  }

  /**
   * @desc Sets the player cash and pot cash value
   * @param {boolean} - Is Card between?
   * @param {number} - Bet amount
   * @returns {void}
   */
  setCashAmounts(isCardBetween, bet) {
    const gameText = document.getElementById('game-text');
    const gameInput = document.getElementById('game-input');
    //console.log('in here');
    gameInput.style.visibility = "hidden";
    switch (isCardBetween) {
      case 1:
        gameText.innerText = ` ${this._currentPlayer.name}: you WIN your bet from the pot!`;
        //console.log(` - You win your bet from the pot!`);
        this._currentPlayer.cash += bet;
        this._potValue -= bet;
        break;
      case 2:
        gameText.innerText = ` ${this._currentPlayer.name}: you PAY your bet to the pot!`;
        //console.log(` - You pay your bet to the pot!`);
        this._currentPlayer.cash -= bet;
        this._potValue += bet;
        break;
      case 3:
        gameText.innerText = ` ${this._currentPlayer.name}: you PAY DOUBLE your bet to the pot!`;
        //console.log(` - You pay double your bet to the pot!`);
        this._currentPlayer.cash -= bet*2;
        this._potValue += bet*2;
        break;
    }
  }

  /**
   * @desc Sets the HTML on the page to the drawn cards HTML
   * @param {Card} - Card object
   * @param {string} - HTML element card ID
   * @returns {void}
   */
  displayCard(drawnCard, cardID) {
    let cardElement = document.getElementById(cardID);
    cardElement.replaceChild(drawnCard.html, cardElement.childNodes[1]);
  }

  /**
   * @desc Clears the cards HTML on the board
   * @returns {void}
   */
  clearCards() {
    const cards = document.getElementsByClassName('card');
    for (let card of cards) {
      card.childNodes[1].innerHTML = '';
      //console.log(card.childNodes[1]);
    }
  }

  /**
   * @desc Ends game sequence. Starts fireworks.
   * @returns {void}
   */
  endGame() {
    document.body.innerHTML = `
        <h1 id="win">${this._currentPlayer.name} WINS!</h1>
        <canvas id='myCanvas'></canvas>
    `;
    new Fireworks();
  }
}

window.addEventListener('load', () => {
  new Game();
});