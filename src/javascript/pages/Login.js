/**
 * Contains the methods necessary for the login page
 */

'use strict';

import STATIC from '../Static.js';

class Login {

    constructor() {
        STATIC.disableEnterKey();
        sessionStorage.setItem("user", '');
        sessionStorage.setItem("email", '');
        this.loginEventListener();
        this.newUserLinkListener();
    }

    /**
     * Listens for new login
     * @returns {void}
     */
    loginEventListener() {
        const $loginButton = document.getElementById('login-button');

        $loginButton.addEventListener('click', async () => {
            const loginForm = new FormData(document.getElementById(`login-form`));
            const email = loginForm.get('email');
            const password = loginForm.get('password');
            const loginData = {
                "email": email,
                "password": password
            };
            const loginDataJsonString = JSON.stringify(loginData);
            const isValidLogin = await STATIC.performFetch(loginDataJsonString, 'fetch.login');

            if (isValidLogin === 'true') {
                sessionStorage.setItem("email", String(email));
                document.location.href="/home";
            } else {
                STATIC.setMessageText('Error invalid password or user not found', false);
            }
        });
    }

    /**
     * Listens for new user button click
     * @returns {void}
     */
    newUserLinkListener() {
        const $newUserButton = document.getElementById('newuser-button');
        $newUserButton.addEventListener('click', () => {
            document.location.href="/newuser";
        });
    }

}

{
    new Login();
}