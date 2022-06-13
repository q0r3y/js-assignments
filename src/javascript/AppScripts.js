/**
 * When the user a logged in, this is ran on every page
 */

'use strict';

import STATIC from './Static.js';
import MENU_BAR from "./components/MenuBar.js";

class AppScripts {

    /**
     *
     */
    constructor() {
        STATIC.disableEnterKey();
        new MENU_BAR();
    }
}
{
new AppScripts();
}