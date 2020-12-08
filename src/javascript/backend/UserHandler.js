'use strict';

export default class UserHandler {

    static userCounter = 0;
    static userList = [];

    static addUser(User) {
        User._USER_ID = ++UserHandler.userCounter;
        UserHandler.userList.push(User)
        console.log(`UserHandler.addNewUser : New user added!`);
        console.log(`Name: ${User.name}`);
        console.log(`Email: ${User.email}`);
        console.log(`Password: ${User.password}`);
        console.log(`UserID:${User._USER_ID}`);
    }

    static login(EMAIL, PASSWORD) {
        let validLogin = false;
        for (let user of this.userList) {
            if (user.email === EMAIL && user.password === PASSWORD) {
                validLogin = true;
                console.log(`Found valid login!`);
                break;
            }
            console.log(`Checking logins`);
        }
        return validLogin;
    }


}