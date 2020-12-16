'use strict';

/**
 * Controls the actions of the menubar buttons
 */

export default class MenuBar {

    constructor() {
        console.log(`New MenuBar constructed.`);
        MenuBar.homeLinkListener();
        MenuBar.depositLinkListener();
        MenuBar.transferLinkListener();
        MenuBar.logoutLinkListener();
    }

    static homeLinkListener() {
        document.getElementById('home-button').addEventListener('click', () => {
            document.location.href="/home";
        })
    }

    static depositLinkListener() {
        document.getElementById('deposit-button').addEventListener('click', () => {
            document.location.href="/deposit";
        })
    }

    static transferLinkListener() {
        document.getElementById('transfer-button').addEventListener('click', () => {
            document.location.href="/transfer";
        })
    }

    static logoutLinkListener() {
        document.getElementById('logout-button').addEventListener('click', () => {
            document.location.href="/";
        })
    }
}