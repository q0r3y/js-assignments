/**
 * Contains Static methods that are used on multiple pages
 */

'use strict';

export default class Static {

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
     * For disabling enter key
     * @returns {void}
     */
    static disableEnterKey() {
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

    /**
     *
     * @param email
     * @returns {Promise<void>}
     */
    static async setUserSessionData(email) {
        const emailJson = JSON.stringify({"email" : email})
        const currentUser = await Static.performFetch(emailJson, 'fetch.user');
        sessionStorage.setItem("user", currentUser);
    }

}