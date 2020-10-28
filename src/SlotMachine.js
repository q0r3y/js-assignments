/**
*   @author: q0r3y
*   @version: 0.0.1
*   @summary: SlotMachine Class
*   @todo
*/

"use strict";
class SlotMachine {
  #_reels = new Map();

  constructor() {
    this.#_reels.set("reel1", ["Cherries", "Oranges", "Plums", "Bells", "Melons", "Bars"]);
    this.#_reels.set("reel2", ["Cherries", "Oranges", "Plums", "Bells", "Melons", "Bars"]);
    this.#_reels.set("reel3", ["Cherries", "Oranges", "Plums", "Bells", "Melons", "Bars"]);
  }

  spinReels() {
    const itemsPerReel = [...this.#_reels.values()][0].length-1;
    const spinResult = [];

    for (const [key, value] of this.#_reels) {
      const randIndex = (Number(Math.floor((Math.random() * itemsPerReel+1))));
      spinResult.push(value[randIndex]);
    }
    return spinResult;
  }
}
module.exports = SlotMachine;
