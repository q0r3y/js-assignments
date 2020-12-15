'use strict';

import STATIC from '../Static.js';
import MENU_BAR from '../components/MenuBar.js'
import IMAGE_CAPTURE from '../components/ImageCapture.js';

export default class Deposit {

    _user;

    constructor() {
        console.log('New Deposit constructed.');
        new MENU_BAR();
        new IMAGE_CAPTURE();
    }

    async setCurrentUser() {
        this._user = await STATIC.getUserData();
    }

}
{
    new Deposit();
}