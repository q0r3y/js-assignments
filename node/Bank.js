'use strict';

const USER_HANDLER = require('./UserHandler');

//todo: handle bank processes
// Does this need to exist?
class Bank {

    constructor() {
        console.log('New Bank Created');
    }

    async createNewUser(userData) {
        await USER_HANDLER.addUser(userData);
    }

    async userLogin(EMAIL, PASSWORD) {
        return await USER_HANDLER.userLogin(EMAIL, PASSWORD);
    }


}

module.exports = Bank;