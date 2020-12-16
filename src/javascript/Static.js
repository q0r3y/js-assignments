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
        console.log(`Performing fetch with parameters: ${data}, ${fetchHeader}`);
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

    /**
     *
     * @param EMAIL
     * @returns {Promise<void>}
     */
    static async setUserSessionData(EMAIL) {
        const emailJson = JSON.stringify({"email" : EMAIL})
        console.log(`Setting user session data`);
        const currentUser = await Static.performFetch(emailJson, 'fetch.user');
        console.log(currentUser);
        sessionStorage.setItem("user", currentUser);
    }

}