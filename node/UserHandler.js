'use strict';

// TODO: Check if user has already been created

const USER = require('./User');

class UserHandler {

    static userCounter = 0;
    static userList = [];

    static async addUser(userData) {
        const newUser = new USER(userData._name, userData._email, userData._password);
        newUser._USER_ID = ++UserHandler.userCounter;
        await UserHandler.userList.push(newUser)
        console.log(`UserHandler.addNewUser : New user added!`);
        console.log(`Name: ${newUser.name}`);
        console.log(`Email: ${newUser.email}`);
        console.log(`Password: ${newUser.password}`);
        console.log(`UserID:${newUser._USER_ID}`);
    }

    static async userLogin(EMAIL, PASSWORD) {
        let validLogin = false;
        for (let user of this.userList) {
            if (user.email === EMAIL && user.password === PASSWORD) {
                validLogin = true;
                console.log(`${EMAIL} logged in!`);
                break;
            }
            console.log(`Checking logins...`);
        }
        return validLogin;
    }
}

module.exports = UserHandler;
