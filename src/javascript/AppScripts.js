/**
 *
 */

'use strict';

import STATIC from './Static.js';
import MENU_BAR from "./components/MenuBar.js";

export default class AppScripts {

    constructor() {
        STATIC.stopEnterKey();
        new MENU_BAR();
    }

}
{
new AppScripts();
}