'use strict';

import USER_HANDLER from './UserHandler.js';

export default class Bank {

    constructor() {
        console.log('New Bank Created');
    }

    createNewUser(User) {
        USER_HANDLER.addUser(User);
    }

    userLogin(EMAIL, PASSWORD) {
        return USER_HANDLER.login(EMAIL, PASSWORD);
    }


}