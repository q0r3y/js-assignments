/**
 *   @author: q0r3y
 *   @version: 0.0.1
 *   @summary: Project 2: Pig Dice Game
 *   @todo add documentation
 */

"use strict";
const PROMPT = require('readline-sync');
const DIE = require('./Die.js');
const PLAYER = require('./Player.js');

class Game {

    #dice = [];
    #players = [];
    #WINNING_SCORE = 500;
    #playing = true;
    #rolling;

    constructor() {
        this.createDice(2, 6);
        this.createPlayers(2);
        this.play();
    }

    play() {
        while(this.#playing) {
            for(let player of this.#players) {
                if(this.#playing) {
                    this.#rolling = true;
                    player.setTurnPoints(0);
                    this.printPlayer(player);
                    while(this.#rolling) {
                        this.printTotal(player);
                        this.rollDice();
                        if(this.checkRoll()) {
                            this.setTurnScore(player);
                            this.printTurnScore(player);
                            if(!this.rollPrompt(player)) {
                                this.setTotalScore(player);
                                this.checkForWin(player);
                            }
                        } else {
                            this.printBadRoll();
                        }
                    }
                }
            }
        }
    }

    createDice(numberDice, dieType) {
        for(let i = 0; i < numberDice; ++i) {
            this.#dice[i] = new DIE(dieType);
        }
    }

    createPlayers(numPlayers) {
        for(let i = 1; i <= numPlayers; ++i) {
            this.#players.push(new PLAYER(String(`Player${i}`)));
        }
    }

    rollDice() {
        let i = 1;
        for(let die of this.#dice) {
            die.setDieValue(die.roll());
            console.log(`: Dice${i} rolled: ${die.getDieValue()}`);
            ++i;
        }
    }

    setTurnScore(player) {
        for(let die of this.#dice){
            player.setTurnPoints(player.getTurnPoints()+die.getDieValue());
        }
    }

    setTotalScore(player) {
        player.setTotalPoints(player.getTotalPoints()+player.getTurnPoints());
    }

    checkRoll() {
        for(let die of this.#dice) {
            if(die.getDieValue() === 1) {
                return false;
            }
        }
        return true;
    }

    printTotal(player) {
        console.log(`\n: Total Points: ${player.getTotalPoints()}`);
    }

    printTurnScore(player) {
        console.log(`: Turn points: ${player.getTurnPoints()}\n`);
    }

    rollPrompt(player) {
        let chosen = false;
        let selection = PROMPT.question(`${player.getName()} Would you like to roll again? (y/n): `);
        while(!chosen) {
            if(selection.toLowerCase() === 'y' ) {
                this.#rolling = true;
                return true;
            } else if(selection.toLowerCase() === 'n') {
                this.#rolling = false;
                return false;
            } else {
                selection = PROMPT.question(`: Invalid answer. Would you like to roll again? (y/n): `);
            }
        }
    }

    checkForWin(player) {
        if(player.getTotalPoints() >= this.#WINNING_SCORE) {
            this.#playing = false;
            console.log(`\n *** Congratulations! ${player.getName()} you win! ***`);
        }
    }

    printBadRoll() {
        console.log(`: Turn points: 0\n`);
        console.log(`: You rolled a 1! You lost the points for this turn!`);
        this.#rolling = false;
    }

    printPlayer(player) {
        console.log(`\n::::: ${player.getName()} :::::`);
    }
}

{
    new Game();
}
