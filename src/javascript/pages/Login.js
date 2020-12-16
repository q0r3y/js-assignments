'use strict';

import STATIC from '../Static.js';

export default class Login {

    constructor() {
        sessionStorage.setItem("user", '');
        STATIC.stopEnterKey();
        this.loginEventListener();
        this.newUserLinkListener();
    }

    /**
     * Listens for new login
     * @returns {void}
     */
    loginEventListener() {
        console.log(`Listening for login`);

        document.getElementById(`login-button`).addEventListener('click', async () => {
            const loginForm = new FormData(document.getElementById(`login-form`));
            const EMAIL = loginForm.get('email');
            const PASSWORD = loginForm.get('password')

            const loginData = {
                "email": EMAIL,
                "password": PASSWORD
            }

            const stringJson = JSON.stringify(loginData);

            const isValidLogin = await STATIC.performFetch(stringJson, 'fetch.login');

            if (isValidLogin === 'true') {
                console.log('Valid login found!')
                await STATIC.setUserSessionData(EMAIL);
                document.location.href="/home";
            } else {
                document.getElementById('error-text').innerText = "Error invalid password or user not found";
            }
        })
    }

    /**
     * Listens for new user button click
     * @returns {void}
     */
    newUserLinkListener() {
        document.getElementById('newuser-button').addEventListener('click', () => {
            document.location.href="/newuser";
        })
    }



}
{
    new Login();
}