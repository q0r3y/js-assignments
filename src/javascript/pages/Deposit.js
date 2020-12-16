/**
 *
 */

'use strict';

//todo send data, store in users account

import STATIC from '../Static.js';
import IMAGE_CAPTURE from '../components/ImageCapture.js';

export default class Deposit {

    _user;

    constructor() {
        this._user = JSON.parse(sessionStorage.getItem("user"));
        new IMAGE_CAPTURE();
    }

}
{
    new Deposit();
}