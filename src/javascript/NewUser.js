'use strict';

import STATIC from './Static.js';

export default class NewUser {

    constructor() {
        this.newUserEventListener();
    }

    /**
     * Listens for new user event
     * @returns {void}
     */
    newUserEventListener() {
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
            const userCreated = await STATIC.performFetch(stringJson, 'fetch.newuser');
            console.log(userCreated,userCreated, typeof(userCreated));

            if (userCreated === 'true') {
                console.log(`New user created!`);
                document.location.href="/";
            } else {
                console.log('User was not created');
            }

            // Need to add a message on success


            // if fail then post error message
        })

    }

}
{
    new NewUser();
}
