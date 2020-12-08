'use strict';

import USER from './User.js';

export default class Static {

    constructor() {
        console.log('New Static Constructed.');
    }

    /**
     * Listens for new user event
     * @returns {void}
     */
    static newUserEventListener(BANK) {
        console.log(`Listening on New User Event`);

        document.getElementById('new-user-submit').addEventListener('click', () => {
            const newUserForm = new FormData(document.getElementById('new-user-form'));

            const newUserObject = createUserObject(newUserForm);
            BANK.createNewUser(newUserObject);
            // Change web page
        })

        function createUserObject(newUserForm) {
            const NAME = newUserForm.get('name');
            const EMAIL = newUserForm.get('email');
            const PASSWORD = newUserForm.get('password');
            return new USER(NAME, EMAIL, PASSWORD);
        }

    }

    static loginEventListener(BANK) {
        console.log(`Listening for login`);

        document.getElementById(`login-submit`).addEventListener('click', () => {
            const loginForm = new FormData(document.getElementById(`login-form`));

            const EMAIL = loginForm.get('email');
            const PASSWORD = loginForm.get('password');

            BANK.userLogin(EMAIL, PASSWORD);
        })
    }

    /**
     * For disabling enter key
     * @returns {void}
     */
    static stopEnterKey() {
        document.addEventListener('keypress', function(event) {
            const theKey = event.key;
            if (theKey.length > 1) {
                if (theKey === 'Enter') {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        });
    }

}