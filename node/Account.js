'use strict';

class Account {

    static _ACCOUNT_NUMBER = 1000;
    #_accountType;
    #_balance;
    #_accountNumber;

    /**
     *
     * @param accountType
     * @param balance
     */
    constructor(accountType, balance=0) {
        this.#_accountType = accountType;
        this.#_balance = balance;
        this.#_accountNumber = ++Account._ACCOUNT_NUMBER;
    }

    get accountType() {
        return this.#_accountType;
    }

    set accountType(value) {
        this.#_accountType = value;
    }

    get balance() {
        return this.#_balance;
    }

    set balance(value) {
        this.#_balance = value;
    }

    get accountNumber() {
        return this.#_accountNumber;
    }

    set accountNumber(value) {
        this.#_accountNumber = value;
    }

}

module.exports = Account;