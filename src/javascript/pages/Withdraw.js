'use strict';

import STATIC from '../Static.js';
import MENU_BAR from '../components/MenuBar.js'

export default class Withdraw {

    _user;

    constructor() {
        console.log('New Withdraw constructed.');
        new MENU_BAR();
        this.setCurrentUser()
    }

    async setCurrentUser() {
        this._user = await STATIC.getUserData();
    }

}
{
    new Withdraw();
}