'use strict';

/**
 * Controls the actions of the menubar buttons
 */

export default class MenuBar {

    constructor() {
        console.log(`New MenuBar constructed.`);
        MenuBar.homeLinkListener();
        MenuBar.depositLinkListener();
        MenuBar.withdrawLinkListener();
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

    static withdrawLinkListener() {
        document.getElementById('withdraw-button').addEventListener('click', () => {
            document.location.href="/withdraw";
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