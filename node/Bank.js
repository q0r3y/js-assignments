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
            if (user.email === newUserData.email) {
                console.log('User already exists');
                return false;
            }
        }
        const newUser = new USER(newUserData.name, newUserData.email, newUserData.password);
        this.#userList.push(newUser)
        console.log(`UserHandler.addNewUser : New user added!`);
        console.log(`Name: ${newUser.name}`);
        console.log(`Email: ${newUser.email}`);
        console.log(`Password: ${newUser.password}`);
        console.log(`UserID:${newUser.userID}`);
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

    getUserObject(EMAIL) {
        for (let user of this.#userList) {
            if (user.email === EMAIL) {
                return {
                    'account_id':user.userID,
                    'name': user.name,
                    'email': user.email,
                    'savings_balance': user.accounts.SAVINGS.balance,
                    'checking_balance': user.accounts.CHECKING.balance,
                    'credit_balance': user.accounts.CREDIT.balance,
                    'savings_account': user.accounts.SAVINGS.accountNumber,
                    'checking_account': user.accounts.CHECKING.accountNumber,
                    'credit_account' : user.accounts.CREDIT.accountNumber
                };
            }
        }
    }

    transferFunds(fromAccount, toAccount, transferAmount) {
        console.log('Transferring funds');
        console.log(fromAccount, toAccount);


        const fromUser = {
            'accountValid' : false,
            'account' : ''
        }

        const toUser = {
            'accountValid' : false,
            'account' : ''
        }

        for (let user of this.#userList) {
            console.log(`Checking user list..`);
            for (let account in user.accounts) {
                const USERS_ACCOUNT_NUMBER = String(user.accounts[account].accountNumber);
                console.log(USERS_ACCOUNT_NUMBER);
                if (fromAccount === USERS_ACCOUNT_NUMBER) {
                    fromUser.accountValid = true;
                    fromUser.account = user.accounts[account];
                    console.log('Found valid From Account');
                }
                if (toAccount === USERS_ACCOUNT_NUMBER) {
                    toUser.accountValid = true;
                    toUser.account = user.accounts[account];
                    console.log('Found valid To Account');
                }

                if (fromUser.accountValid && toUser.accountValid) {
                    if (fromUser.account.balance - transferAmount >= 0) {
                        fromUser.account.balance -= transferAmount;
                        toUser.account.balance += transferAmount;
                        console.log(fromUser.account.balance);
                        console.log(`Funds transferred successfully.`);
                        return true;
                    } else {
                        console.log(`The transfer would make the fromAccount balance negative. Returning false`);
                        return false;
                    }
                }
            }
        }
        return false;
    }

    depositFunds(account) {

    }

    withdrawFunds(account) {

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