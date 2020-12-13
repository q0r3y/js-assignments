'use strict';

class User {

    static _USER_ID = 0;
    #_email;
    #_password;
    #_name;
    #_savings_balance;
    #_checking_balance;
    #_credit_balance;


    constructor(name, email, password) {
        this.#_name = name;
        this.#_email = email;
        this.#_password = password;
        this.#_savings_balance = 100;
        this.#_checking_balance = 0;
        this.#_credit_balance = 0;
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


}

module.exports = User;