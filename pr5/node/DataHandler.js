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
          let jsonData = '';


          request.on('data', chunk => {
               data += chunk;
          })

          request.on('end', () => {
               jsonData = JSON.parse(data);
               console.log(jsonData);
          })

          try {

          } catch (error) {
               return error;
          }
     }
}

module.exports = DataHandler;