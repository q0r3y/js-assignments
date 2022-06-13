/**
*   @author: q0r3y
*   @version: 0.0.2
*   @summary: SlotMachine Game Class
*   @todo
*/

"use strict";
const SLOT_MACHINE = require('./SlotMachine.js');
const PROMPT = require('readline-sync');

class Game {
  #_playing = true;
  #_firstTry = true;
  #_slotMachine = new SLOT_MACHINE;
  #_deposit = 0;
  #_amountWon = 0;

  constructor() {
    this.play();
  }

  play() {
    while(this.#_playing) {
      if(this.#_firstTry) {
        this.printGame();
        this.setDeposit();
      }
      const spinResult = this.getSpinResult();
      const matches = this.processResults(spinResult);
      this.displayWinnings(matches);
      this.replay();
    }
  }

  printGame() {
    console.log(`\n**Welcome to the simulated slot machine**\n`);
  }

  setDeposit() {
    const MIN = 1; // Minimum of 1 dollar
    let amount = PROMPT.question(` How much money would you like to insert: `);
    let chosen = false
    while(!chosen) {
      if(amount >= MIN || !isNaN(amount)) {
        this.#_deposit = amount;
        chosen = true;
      } else {
        amount = PROMPT.question(`Invalid choice. Please choose a positive integer: `);
      }
    }
  }

  getDeposit() {
    return this.#_deposit;
  }

  setAmountWon(amount) {
    this.#_amountWon += amount;
  }

  getAmountWon() {
    return this.#_amountWon
  }

  getSpinResult() {
    return this.#_slotMachine.spinReels();
  }

  processResults(spinResult) {
    console.log(`\n${spinResult}\n`);
    const countMap = spinResult.reduce((map, item) => map.set(item, (map.get(item) || 0) + 1), new Map());
    return [...countMap.values()].sort().pop();
  }

  displayWinnings(matches) {
    switch (matches) {
      case 3:
      console.log(` You had 3 matches! You win $${this.getDeposit() * 3} this round.\n`);
      this.setAmountWon(this.getDeposit() * 3);
      break;
      case 2:
      console.log(` You had 2 matches! You win $${(this.getDeposit() * 2)} this round.\n`);
      this.setAmountWon(this.getDeposit() * 2);
      break;
      case 1:
      console.log(` You had no matches! You win $0 this round.\n`);
      this.#_amountWon = 0;
      break;
    }

  }

  replay() {
    let choice = PROMPT.question(`Would you like to play again?(y/n): `);
    let chosen = false;
    while(!chosen) {
      if(choice.toLowerCase() === "y") {
        chosen = true;
        this.#_firstTry = this.#_amountWon === 0;
      } else if (choice.toLowerCase() === "n") {
        this.#_playing = false;
        chosen = true;
        console.log(`You deposited: ${this.getDeposit()}`);
        console.log(`You won: ${this.getAmountWon()}`);
        this.setAmountWon(0);
      } else {
        choice = PROMPT.question(`Invalid choice. Would you like to play again?(y/n): `);
      }
    }
  }
}

{
  new Game();
}
