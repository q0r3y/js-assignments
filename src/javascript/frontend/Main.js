'use strict';

import BANK from '../backend/Bank.js';
import STATIC from './Static.js';

export default class Main {

    BANK;

    constructor() {
        this.BANK = new BANK();
        STATIC.stopEnterKey();
        STATIC.newUserEventListener(this.BANK); // Call this on the new user screen
    }

}
{
    new Main();
}