'use strict';

import EVENT_LISTEN from './EventListeners.js';

export default class Login {
    constructor() {
        EVENT_LISTEN.loginEventListener();
    }


}
{
    new Login();
}