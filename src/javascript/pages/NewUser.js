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
            const userDataJsonString = JSON.stringify(userData);

            const isUserCreated = await STATIC.performFetch(userDataJsonString, 'fetch.newuser');

            if (isUserCreated === 'true') {
                const $messageText = document.getElementById('message-text');
                $messageText.innerText = "User created!";
                setTimeout( () => {
                    document.location.href="/";
                }, 1250);
            } else {
                const $messageText = document.getElementById('message-text');
                $messageText.innerText = "User already exists";
                console.log('User was not created');
            }
        });
    }
}
{
    new NewUser();
}
