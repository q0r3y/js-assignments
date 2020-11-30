'use strict';

const FS = require('fs');
const FORMIDABLE = require('formidable').IncomingForm;

class DataHandler {

     static renderDom(path, contentType, callback, encoding) {
          FS.readFile(path, encoding ? encoding : `utf-8`, (error, string) => {
               callback(error, string, contentType);
          });
     }

     static async receiveData(request, response) {
          console.log(response.body);
          try {
               console.log(request.body);
          } catch (error) {
               return error;
          }
     }

}

module.exports = DataHandler;