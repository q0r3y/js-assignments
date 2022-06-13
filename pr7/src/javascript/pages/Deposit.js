/**
 * Contains scripts necessary for the Deposit page
 */

// todo, image capture send

'use strict';

import IMAGE_CAPTURE from '../components/ImageCapture.js';

class Deposit {

    _user = JSON.parse(sessionStorage.getItem("user"));

    /**
     *
     */
    constructor() {
        new IMAGE_CAPTURE();
    }

}
{
    new Deposit();
}