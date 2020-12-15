'use strict';

/**
 * Contains Static methods that are used on multiple pages
 */

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

    static async getUserData() {
        let current_user = JSON.stringify({ 'email' : sessionStorage.getItem("user") } );
        current_user = JSON.parse(await Static.performFetch(current_user, 'fetch.user'));
        console.log(`Static.js: Got user object`);
        return current_user;
    }

}