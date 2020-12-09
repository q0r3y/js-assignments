'use strict';

import EVENT_LISTEN from './EventListeners.js';

export default class NewUser {


    constructor() {
        EVENT_LISTEN.newUserEventListener();
    }


}
{
    new NewUser();
}
