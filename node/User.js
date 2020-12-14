'use strict';

const Account = require("./Account");

class User {

    static _USER_ID = 0;
    #_email;
    #_password;
    #_name;
    #_accounts;
    #_userID;

    #_savings_balance;
    #_checking_balance;
    #_credit_balance;


    constructor(name, email, password) {
        this.#_name = name;
        this.#_email = email;
        this.#_password = password;
        this.#_userID = ++User._USER_ID;
        this.createAccounts();
    }

    createAccounts() {
        this.#_accounts = {
            'SAVINGS' : new Account('SAVINGS', 100),
            'CHECKING': new Account('CHECKING'),
            'CREDIT' : new Account('CREDIT')
        }

        console.log(`Created new SAVINGS account: ${this.#_accounts.SAVINGS.accountNumber}`);
        console.log(`Created new CHECKING account: ${this.#_accounts.CHECKING.accountNumber}`)
        console.log(`Created new CREDIT account: ${this.#_accounts.CREDIT.accountNumber}`);
    }

    get email() {
        return this.#_email;
    }

    set email(value) {
        this.#_email = value;
    }

    get password() {
        return this.#_password;
    }

    set password(value) {
        this.#_password = value;
    }

    get name() {
        return this.#_name;
    }

    set name(value) {
        this.#_name = value;
    }

    get savings_balance() {
        return this.#_savings_balance;
    }

    set savings_balance(value) {
        this.#_savings_balance = value;
    }

    get checking_balance() {
        return this.#_checking_balance;
    }

    set checking_balance(value) {
        this.#_checking_balance = value;
    }

    get credit_balance() {
        return this.#_credit_balance;
    }

    set credit_balance(value) {
        this.#_credit_balance = value;
    }

    get accounts() {
        return this.#_accounts;
    }

    set accounts(value) {
        this.#_accounts = value;
    }

    get userID() {
        return this.#_userID;
    }

    set userID(value) {
        this.#_userID = value;
    }


}

module.exports = User;