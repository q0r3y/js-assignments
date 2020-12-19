"use strict";

/**
 * Dispatch class
 */

class Main {

    /**
     * @constructor
     */
    constructor() {
        Main.loadServiceWorker();
    }

    /**
     *
     * @returns {Promise<void>}
     */
    static async loadServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/ServiceWorker.js');
            } catch {
                console.log(`Service worker registration failed.`);
            }
        }
    }
}

/**
 * Bootstraps program by instantiating object of Main()
 */
window.addEventListener('load', () => {
    new Main();
});