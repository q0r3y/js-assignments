'use strict';

class User {

    _email;
    _password;
    _name;
    _balance;
    _USER_ID;

    constructor(name, email, password) {
        this._name = name;
        this._email = email;
        this._password = password;
        this._balance = 0;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
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

    get USER_ID() {
        return this._USER_ID;
    }

    set USER_ID(value) {
        this._USER_ID = value;
    }

}

module.exports = User;