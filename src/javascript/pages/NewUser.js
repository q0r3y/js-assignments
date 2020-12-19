/**
 * Contains the methods necessary for the NewUser page
 */

'use strict';

import STATIC from '../Static.js';

class NewUser {

    /**
     *
     */
    constructor() {
        STATIC.disableEnterKey();
        this.newUserEventListener();
    }

    /**
     * Listens for submit button click on the new user page
     * @returns {void}
     */
    newUserEventListener() {
        const $submitButton = document.getElementById('new-user-submit');
        $submitButton.addEventListener('click', async () => {
            const newUserForm = new FormData(document.getElementById('new-user-form'));
            const userData = {
                "name": newUserForm.get('name'),
                "email": newUserForm.get('email'),
                "password":newUserForm.get('password')
            }
            const validInput = this.validateInput(userData);
            if (validInput) {
                const userDataJsonString = JSON.stringify(userData);
                const isUserCreated = await STATIC.performFetch(userDataJsonString, 'fetch.newuser');
                if (isUserCreated === 'true') {
                    STATIC.setMessageText('User created!', true, "/");
                } else {
                    STATIC.setMessageText('User already exists', false);
                }
            } else {
                STATIC.setMessageText('Email and password must contain 5 or more characters.', false);
            }
        });
    }

    validateInput(inputData) {
        return !(inputData.email.length < 5 || inputData.password < 5);
    }
}
{
    new NewUser();
}
