'use strict';

const FS = require('fs');

class DataHandler {

     static renderDom(path, contentType, callback, encoding) {
          FS.readFile(path, encoding ? encoding : `utf-8`, (error, string) => {
               callback(error, string, contentType);
          });
     }

     static async receiveData(request, response) {
          // https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
          let data = '';
          request.on('data', chunk => {
               data += chunk;
          })
          request.on('end', () => {
               console.log(JSON.parse(data).test);
          })
          try {
          } catch (error) {
               return error;
          }
     }

}

module.exports = DataHandler;