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

    createNewUser(newUserData) {
        for (let user of this.#userList) {
            if (user.email === newUserData._email) {
                console.log('User already exists');
                return false;
            }
        }
        const newUser = new USER(newUserData._name, newUserData._email, newUserData._password);
        newUser._USER_ID = ++USER._USER_ID;
        this.#userList.push(newUser)
        console.log(`UserHandler.addNewUser : New user added!`);
        console.log(`Name: ${newUser.name}`);
        console.log(`Email: ${newUser.email}`);
        console.log(`Password: ${newUser.password}`);
        console.log(`UserID:${newUser._USER_ID}`);
        return true;
    }

    async userLogin(EMAIL, PASSWORD) {
        let isLoginValid = false;
        console.log(`Checking logins...`);
        for (let user of this.#userList) {
            if (user.email === EMAIL && user.password === PASSWORD) {
                isLoginValid = true;
                console.log(`${EMAIL} logged in!`);
                return isLoginValid;
            }
        }
        console.log('Login not found.');
        return isLoginValid;
    }

    async getUserObject(EMAIL) {
        for (let user of this.#userList) {
            if (user.email === EMAIL) {
                return {
                    '_name': user.name,
                    '_email': user.email,
                    '_savings_balance': user.savings_balance,
                    '_checking_balance': user.checking_balance,
                    '_credit_balance': user.credit_balance
                };
            }
        }
    }


    createTestUser() {
        // TEST ACCOUNT
        const testUser = new USER('asdf', 'asdf', 'asdf');
        testUser._USER_ID = ++USER._USER_ID;
        this.#userList.push(testUser);
        console.log(`Created test user`);
    }
}

module.exports = Bank;