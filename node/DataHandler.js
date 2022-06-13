'use strict';

// Todo: Finish deposit method

const FS = require('fs');

class DataHandler {

     static renderDom(path, contentType, callback, encoding) {
          FS.readFile(path, encoding ? encoding : `utf-8`, (error, string) => {
               callback(error, string, contentType);
          });
     }

     /**
      * @desc Handles login operation (fetch.login)
      * @param bank
      * @param request
      * @param response
      * @returns {Promise<void>}
      */
     static async handleLogin(bank, request, response) {
          await DataHandler.handleJsonData(request, response, async (parsedData) => {
               const EMAIL = parsedData.email;
               const PASSWORD = parsedData.password;
               let isValidLogin;
               if (EMAIL.length <= 0 || PASSWORD.length <=0) {
                    isValidLogin = false;
               } else {
                    isValidLogin = await bank.userLogin(EMAIL, PASSWORD);
               }
               response.end(String(isValidLogin))
          })
     }

     /**
      * @desc Handles the creation of a new user (fetch.newuser)
      * @param bank
      * @param request
      * @param response
      * @returns {Promise<void>}
      */
     static async handleNewUser(bank, request, response) {
          await DataHandler.handleJsonData(request, response, async (parsedData) => {
               const newUserCreated = await bank.createNewUser(parsedData);
               response.end(String(newUserCreated));
          })
     }

     /**
      * @desc Retrieves the user object (fetch.user)
      * @param bank
      * @param request
      * @param response
      * @returns {Promise<void>}
      */
     static async handleUserRetrieval(bank, request, response) {
          await DataHandler.handleJsonData(request, response, async (parsedData) => {
               const EMAIL = parsedData.email;
               const USER_OBJECT = await bank.getUserObject(EMAIL);
               if (USER_OBJECT) {
                    console.log(`Retrieved user!`);
                    response.end(JSON.stringify(USER_OBJECT));
               }
          })
     }

     /**
      *
      * @param bank
      * @param request
      * @param response
      * @returns {Promise<void>}
      */
     static async handleFundTransfer(bank, request, response) {
          await DataHandler.handleJsonData(request, response, async (parsedData) => {
               const TRANSFER_FROM = parsedData.transfer_from;
               const TRANSFER_TO = parsedData.transfer_to;
               let TRANSFER_AMOUNT = parsedData.transferAmount;
               let transferStatus;

               if (isNaN(TRANSFER_AMOUNT) || TRANSFER_AMOUNT <= 0) {
                    transferStatus = false;
               } else {
                    TRANSFER_AMOUNT = Number(TRANSFER_AMOUNT).toFixed(2);
                    transferStatus = await bank.transferFunds(TRANSFER_FROM, TRANSFER_TO, Number(TRANSFER_AMOUNT));
               }

               response.end(String(transferStatus));
          })
     }

     /**
      *
      * @param bank
      * @param request
      * @param response
      * @returns {Promise<void>}
      */
     static async handleRemoteCheckDeposit(bank, request, response) {
          await DataHandler.handleJsonData(request, response, async (parsedData) => {
               const EMAIL = parsedData.email;
               const base64imageData = parsedData.image_data;
               // Need to store the deposit
               console.log(`Got deposit for user: ${EMAIL}`);
               console.log(base64imageData);
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

     /**
      *
      * @returns {Buffer}
      */
     static getKey() {
          return FS.readFileSync(`data/certificates/localhost.key`);
     }

     /**
      *
      * @returns {Buffer}
      */
     static getCert() {
          return FS.readFileSync(`data/certificates/localhost.crt`);
     }
}

module.exports = DataHandler;