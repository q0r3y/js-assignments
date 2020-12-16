/**
 *
 */

'use strict';

import STATIC from '../Static.js';

export default class Home {

    _user;

    constructor() {
        this._user = JSON.parse(sessionStorage.getItem("user"));
        this.displayName().then(() => {
            this.displayBalance();
        })
    }

    async displayBalance() {
        document.getElementById('savings-name').innerText = `Savings Account: ${this._user.savings_account}`;
        document.getElementById('checking-name').innerText = `Checking Account: ${this._user.checking_account}`;
        document.getElementById('credit-name').innerText = `Credit Card: ${this._user.credit_account}`;
        document.getElementById('savings-balance').innerText = `$${this._user.savings_balance.toFixed(2)}`;
        document.getElementById('checking-balance').innerText = `$${this._user.checking_balance.toFixed(2)}`;
        document.getElementById('credit-balance').innerText = `$${this._user.credit_balance.toFixed(2)}`;
    }

    async displayName() {
        document.getElementById('welcome-name').innerText = `Welcome ${this._user.name}!`;
    }

}
{
    new Home();
}