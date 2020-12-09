'use strict';

const FS = require('fs');

class DataHandler {

     static renderDom(path, contentType, callback, encoding) {
          FS.readFile(path, encoding ? encoding : `utf-8`, (error, string) => {
               callback(error, string, contentType);
          });
     }

     /**
      * @desc Handles the creation of a new user
      * @param bank
      * @param request
      * @param response
      * @returns {Promise<void>}
      */
     static async handleNewUser(bank, request, response) {
          await DataHandler.handleJsonData(request, response, async (parsedData) => {
               await bank.createNewUser(parsedData);
               response.end('User successfully created!');
          })
     }

     /**
      * @desc Handles login operation
      * @param bank
      * @param request
      * @param response
      * @returns {Promise<void>}
      */
     static async handleLogin(bank, request, response) {
          await DataHandler.handleJsonData(request, response, async (parsedData) => {
               const EMAIL = parsedData._email;
               const PASSWORD = parsedData._password;
               const validLogin = await bank.userLogin(EMAIL, PASSWORD);
               if (validLogin) {
                    response.end('true');
               } else {
                    response.end('');
               }
          })
     }

     /**
      * @desc Handles user information for the index page
      * @param bank
      * @param request
      * @param response
      * @returns {Promise<void>}
      */
     static async handleUserInfo(bank, request, response) {
          await DataHandler.handleJsonData(request, response, async () => {

          })
     }

     /**
      * @desc Processes JSON
      * @param request
      * @param response
      * @param callback
      * @returns {Promise<void>}
      */
     static async handleJsonData(request, response, callback) {
          let receivedData = '';
          request.on('data', chunk => {
               receivedData += chunk;
          })
          request.on('end', async () => {
               const parsedData = JSON.parse(receivedData);
               callback(parsedData);
          })
     }

     static getKey() {
          return FS.readFileSync(`data/certificates/localhost.key`);
     }

     static getCert() {
          return FS.readFileSync(`data/certificates/localhost.crt`);
     }
}

module.exports = DataHandler;