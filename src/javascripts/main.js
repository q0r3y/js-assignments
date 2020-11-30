"use strict";

/**
 * Event handling class
 */
export default class Main {

    /**
     * @constructor
     */
    constructor() {
        console.log(`Creating event handler`);
        Main.handleFileUploadButton();
    }

    /**
     * @returns {void}
     */
    static handleFileUploadButton() {
        document.getElementById('button').addEventListener('click', async function() {
            document.getElementById(`card1`).innerText = await Main.performFetch();
            setTimeout(function() {
                document.getElementById(`resultText`).innerText = '\u00A0'; //inserts a text space so element doesn't roll up
            }, 1000);
        });
    }

    /**
     * @async
     * @returns {Promise<string>}
     */
    static async performFetch() {
        console.log(`Performing fetch..`);

        //let textData = document.getElementById('fileUpload');

        let data = {
                "employee": {
                    "name":       "sonoo",
                    "salary":      56000,
                    "married":    true
                }
            };

        console.log(`Data: ${JSON.stringify(data)}`);
        console.log(`${data}`);

        try {
            const response = await fetch(document.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-requested-with': 'fetch.0',
                },
                body: JSON.stringify(data)
            });
            return await response.text();
        } catch(error) {
            console.log(`ERROR: ${error}`);
        }
    }
}

window.addEventListener('load', () => {
    new Main();
});