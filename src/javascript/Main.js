'use strict';
// Stuff that is on every page

import EVENT_LISTEN from './EventListeners.js';

export default class Main {


    constructor() {
        EVENT_LISTEN.stopEnterKey();
    }
}
{
new Main();
}