'use strict';

import STATIC from './Static.js';

export default class Login {

    constructor() {
        sessionStorage.setItem("user", '');
        Login.loginEventListener();
        Login.newUserListener();
    }

    /**
     * Listens for new login
     * @returns {void}
     */
    static loginEventListener() {
        console.log(`Listening for login`);

        document.getElementById(`login-button`).addEventListener('click', async () => {
            const loginForm = new FormData(document.getElementById(`login-form`));
            const EMAIL = loginForm.get('email');
            const PASSWORD = loginForm.get('password')

            const loginData = {
                "_email": EMAIL,
                "_password": PASSWORD
            }

            const stringJson = JSON.stringify(loginData);

            const isValidLogin = await STATIC.performFetch(stringJson, 'fetch.login');
            if (isValidLogin === 'true') {
                console.log('Login successful!');
                sessionStorage.setItem("user", String(EMAIL));
                document.location.href="/index";
            } else {
                document.getElementById('error-text').innerText = "Error invalid password or user not found";
            }
        })
    }

    /**
     * Listens for new user button click
     * @returns {void}
     */
    static newUserListener() {
        document.getElementById('newuser-button').addEventListener('click', () => {
            document.location.href="/newuser";
        })
    }

}
{
    new Login();
}