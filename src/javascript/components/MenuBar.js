/**
 * Controls the actions of the menubar buttons
 */

'use strict';

export default class MenuBar {

    constructor() {
        MenuBar.homeLinkListener();
        MenuBar.depositLinkListener();
        MenuBar.transferLinkListener();
        MenuBar.logoutLinkListener();
    }

    /**
     * Listens for clicks on the home button
     */
    static homeLinkListener() {
        const $homeButton = document.getElementById('home-button');
        $homeButton.addEventListener('click', () => {
            document.location.href="/home";
        });
    }

    /**
     * Listens for clicks on the deposit button
     */
    static depositLinkListener() {
        const $depositButton = document.getElementById('deposit-button');
        $depositButton.addEventListener('click', () => {
            document.location.href="/deposit";
        });
    }

    /**
     * Listens for clicks on the transfer button
     */
    static transferLinkListener() {
        const $transferButton = document.getElementById('transfer-button');
        $transferButton.addEventListener('click', () => {
            document.location.href="/transfer";
        });
    }

    /**
     * Listens for clicks on the logout button
     */
    static logoutLinkListener() {
        const $logoutButton = document.getElementById('logout-button');
        $logoutButton.addEventListener('click', () => {
            document.location.href="/";
        });
    }
}