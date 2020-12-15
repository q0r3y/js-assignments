'use strict';

import STATIC from '../Static.js';
import MENU_BAR from '../components/MenuBar.js'

export default class Transfer {

    _user;

    constructor() {
        console.log('New Transfer constructed.');
        new MENU_BAR();
        this.getCurrentUser().then( () => {
            this.setDropDownMenu();
        })
        this.transferListener();
    }

    async getCurrentUser() {
        this._user = await STATIC.getUserData();
    }

    setDropDownMenu() {
        const savingsDropDown = document.getElementById('savings-drop-down');
        const checkingDropDown = document.getElementById('checking-drop-down');
        const creditDropDown = document.getElementById('credit-drop-down');

        savingsDropDown.innerText = `Savings ${this._user.savings_account} - ${this._user.savings_balance.toFixed(2)}`;
        checkingDropDown.innerText = `Checking ${this._user.checking_account} - ${this._user.checking_balance.toFixed(2)}`;
        creditDropDown.innerText = `Credit ${this._user.credit_account} - ${this._user.credit_balance.toFixed(2)}`;

        savingsDropDown.value = `${this._user.savings_account}`;
        checkingDropDown.value = `${this._user.checking_account}`;
        creditDropDown.value = `${this._user.credit_account}`;
    }

    transferListener() {
        document.getElementById('transfer-submit').addEventListener( 'click', async () => {
            const transferForm = new FormData(document.getElementById(`transfer-form`));
            const transferFromAccount = transferForm.get('transfer-from-account').match(/\d+/)[0];
            const transferToAccount = transferForm.get('transfer-to-account');
            const transferAmount = transferForm.get('transfer-amount');

            console.log(transferAmount);

            const transferData = {
                'transfer_from' : transferFromAccount,
                'transfer_to' : transferToAccount,
                'transferAmount' : transferAmount
            }

            const stringJson = JSON.stringify(transferData);

            let transferStatus = await STATIC.performFetch(stringJson, 'fetch.transfer');

            if (transferStatus === 'true') {
                document.getElementById('message-text').innerText = `Transfer was successful!`;
                setTimeout(() => {
                    document.location.href="/home";
                },1250)

            }

        })
    }

}
{
    new Transfer();
}