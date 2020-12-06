"use strict";

/**
 * Static methods
 */

export default class Main {

    /**
     * @constructor
     */
    constructor() {
        console.log(`Main created.`);
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