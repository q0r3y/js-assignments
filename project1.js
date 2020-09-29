/**
*   @author: q0r3y
*   @version: 0.0.1
*   @summary: Project 1: River Falls Homes Construction Company Project 1 :: created: 09.28.20
*   @todo 
*/

"use strict";
const PROMPT = require('readline-sync');

const HOME_COST = 50000, BEDROOM_COST = 17000, BATHROOM_COST = 12500, CAR_SLOT_COST = 6000;
let lotNumber, numBedrooms, numBathrooms, carSlots, finalPrice;

/**
* @method
* @desc The dispatch method for the program
* @returns {null}
*/

function main() {
  printIntro();
  setLotNumber();
  setNumBedrooms();
  setNumBathrooms();
  setCarSlots();
  calculateResults();
  displayResults();
}

main();

/**
 * @method
 * @desc prints intro
 * @returns {null}
 */
function printIntro() {
  console.log(`\n*** River Falls Homes Construction Company Home Calculator ***\n`);
}

/**
 * @method
 * @desc sets lot number
 * @returns {null}
 */
function setLotNumber() {
  while(isNaN(lotNumber)) {
    lotNumber = PROMPT.question(`What is the lot number for your house? `);
    if(isNaN(lotNumber)){
      console.log(`Error: Input Not a Number.`);
    }
  }
}

/**
 * @method
 * @desc sets number of bedrooms
 * @returns {null}
 */
function setNumBedrooms() {
  while(isNaN(numBedrooms)) {
    numBedrooms = PROMPT.question(`How many bedrooms will be in your home? `);
    if(isNaN(numBedrooms)){
      console.log(`Error: Input Not a Number.`);
    }
  }
}

/**
 * @method
 * @desc sets number of bathrooms
 * @returns {null}
 */
function setNumBathrooms() {
  while(isNaN(numBathrooms)) {
    numBathrooms = PROMPT.question(`How many bathrooms will be in your home? `);
    if(isNaN(numBathrooms)){
      console.log(`Error: Input Not a Number.`);
    }
  }
}

/**
 * @method
 * @desc sets car slots in garage
 * @returns {null}
 */
function setCarSlots() {
  while(isNaN(carSlots)) {
    carSlots = PROMPT.question(`How many cars will your garage need to hold? `);
    if(isNaN(carSlots)){
      console.log(`Error: Input Not a Number.`);
    }
  }
}

/**
 * @method
 * @desc calculates results
 * @returns {null}
 */
function calculateResults() {
  finalPrice = HOME_COST
    + (BEDROOM_COST * numBedrooms)
    + (BATHROOM_COST * numBathrooms)
    + (CAR_SLOT_COST * carSlots);
}

/**
 * @method
 * @desc worker method for printing results
 * @returns {null}
 */
function displayResults() {
  console.log(`\n   Home base price: $${HOME_COST}`);
  console.log(`   Number of bedrooms: ${numBedrooms} x $${BEDROOM_COST}`);
  console.log(`   Number of bathrooms: ${numBathrooms} x $${BATHROOM_COST}`);
  console.log(`   Number of garage stalls: ${carSlots} x $${CAR_SLOT_COST}`);
  console.log(`   The calculated cost for your home is: $${finalPrice}`);
  console.log(`\n*** Thank you for choosing River Falls Homes Construction Company! ***\n`)
}
