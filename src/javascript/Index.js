// get username from local storage
// build page

'use strict';
import STATIC from './Static.js';

export default class Index {

    _name;
    _balance;
    _user;

    constructor() {
        this.createUserObject();
        console.log('You are on the index page!');
        Index.depositListener();
        Index.transferListener();
        Index.logoutListener();
        this.createUserObject();
        this.getUserData();
        this.displayName();
        this.displayBalance();
    }

    createUserObject() {
        this._user = {
            '_email' : sessionStorage.getItem("user"),
            '_name' : '',
            '_balance' : ''
        }
    }

    async getUserData() {
        const CURRENT_USER = JSON.stringify(this._user);

        console.log(`${CURRENT_USER}`);
        this._user = JSON.parse(await STATIC.performFetch(CURRENT_USER, 'fetch.user'));
        console.log(`Got user object`);
        console.log(`${this._user._name}`);
    }

    async displayBalance() {

    }

    async displayName() {
        document.getElementById('welcome-bar').innerText = `Welcome ${this._user._name}`;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }

    static depositListener() {
        const userEmail = sessionStorage.getItem("user");
        document.getElementById('deposit-button').addEventListener('click', () => {
            console.log(`Deposit Button Clicked`);
        })
    }

    static transferListener() {
        const userEmail = sessionStorage.getItem("user");
        document.getElementById('transfer-button').addEventListener('click', () => {
            console.log(`Transfer Button Clicked`);
        })
    }

    static logoutListener() {
        document.getElementById('logout-button').addEventListener('click', () => {
            document.location.href="/";
        })
    }

}
{
    new Index();
}