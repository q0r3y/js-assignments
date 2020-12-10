'use strict';

const USER = require('./User');

//todo: handle bank processes
//todo: add validate class

class Bank {

    #userList = [];

    constructor() {
        console.log('New Bank Created');
        this.createTestUser();
    }

    createNewUser(userData) {
        const newUser = new USER(userData._name, userData._email, userData._password);
        newUser._USER_ID = ++USER._USER_ID;
        this.#userList.push(newUser)
        console.log(`UserHandler.addNewUser : New user added!`);
        console.log(`Name: ${newUser.name}`);
        console.log(`Email: ${newUser.email}`);
        console.log(`Password: ${newUser.password}`);
        console.log(`UserID:${newUser._USER_ID}`);
    }

    async userLogin(EMAIL, PASSWORD) {
        let validLogin = false;
        for (let user of this.#userList) {
            if (user.email === EMAIL && user.password === PASSWORD) {
                validLogin = true;
                console.log(`${EMAIL} logged in!`);
                break;
            }
            console.log(`Checking logins...`);
        }
        return validLogin;
    }

    async getUserObject(EMAIL) {
        for (let user of this.#userList) {
            if (user.email === EMAIL) {
                return {
                    '_name': user.name,
                    '_email': user.email,
                    '_balance': user.balance
                };
            }
        }
    }


    createTestUser() {
        // TEST ACCOUNT
        const testUser = new USER('asdf', 'asdf@asdf.com', 'asdf');
        testUser._USER_ID = ++USER._USER_ID;
        this.#userList.push(testUser);
        console.log(`Created test user`);
    }
}

module.exports = Bank;