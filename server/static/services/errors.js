var path = require('path');
var fs = require('fs');

module.exports = (log, location, error) => {
  'use strict'

  //filter log so it doesn't show duplicate key value errors
  let dupes = error.message.match('duplicate key value');
  // console.log('DUPES==============>', dupes[0]);

  //log any error that is not caused by a duplicate entry
  if(!dupes) {
    let file = log + '.json';
    let targetFile = path.resolve(__dirname, '..', 'logs', file);
    let errorObject = {
      date: Date.now(),
      location: location,
      message: error
    }
    fs.appendFile(targetFile, JSON.stringify(errorObject, null, 4), (err) => {
      if (err) {
        console.log('file system error');
      }

    })
  }
}