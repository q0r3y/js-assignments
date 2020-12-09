'use strict';

export default class EventListeners {

    constructor() {
        console.log('New EventListeners Constructed.');
    }


    /**
     * @async
     * @returns {Promise<string>}
     */
    static async performFetch(data, fetchHeader) {

        try {
            const response = await fetch(document.url, {
                method: 'POST',
                body: data,
                headers: {
                    'x-requested-with': fetchHeader
                }
            });
            return await response.text();
        } catch(error) {
            console.log(`ERROR: ${error}`);
        }
    }

    /**
     * Listens for new user event
     * @returns {void}
     */
    static newUserEventListener() {
        console.log(`Listening on New User Event`);

        document.getElementById('new-user-submit').addEventListener('click', async () => {
            const newUserForm = new FormData(document.getElementById('new-user-form'));

            const userData = {
                "_name": newUserForm.get('name'),
                "_email": newUserForm.get('email'),
                "_password":newUserForm.get('password')
            }

            const stringJson = JSON.stringify(userData);

            // Change screen text to: User has been created.
            let userCreated = await EventListeners.performFetch(stringJson, 'fetch.newuser');
            console.log(userCreated);

            // Need to add a message on success
            document.location.href="/";

            // if fail then post error message
        })

    }

    /**
     * Listens for new login
     * @returns {void}
     */
    static loginEventListener() {
        console.log(`Listening for login`);

        document.getElementById(`login-submit`).addEventListener('click', async () => {
            const loginForm = new FormData(document.getElementById(`login-form`));
            const EMAIL = loginForm.get('email');
            const PASSWORD = loginForm.get('password')

            const loginData = {
                "_email": EMAIL,
                "_password": PASSWORD
            }

            const stringJson = JSON.stringify(loginData);

            let loginStatus = await EventListeners.performFetch(stringJson, 'fetch.login');
            if (loginStatus === 'true') {
                console.log('Login successful!');
                sessionStorage.setItem("user", String(EMAIL));

                // Need to add a message on success
                document.location.href="/index";

            }
        })
    }

    /**
     * For disabling enter key
     * @returns {void}
     */
    static stopEnterKey() {
        console.log(`Enter key disabled.`);
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