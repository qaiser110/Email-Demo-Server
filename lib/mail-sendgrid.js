/**
 * Created by qaiser on 2/12/2016.
 */
'use strict';

var https = require('https');
var prepareSendgridData = require('./prepare-sendgrid-data');

const SENDGRID_API_KEY = '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';

function sendToSendgrid(mailData, callback) {

  var errMsg;
  var postData = prepareSendgridData(mailData);

  var options = {
    host: 'api.sendgrid.com',
    path: '/v3/mail/send',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  var req = https.request(options, function (res) {
    res.on('data', data => {
      if (data) {
        data =  JSON.parse(data);
        if (data.errors) {
          errMsg = data.errors;
        }
      }
    });
    res.on('end', () => {
      if (!errMsg) {
        return callback()
      }
      return callback(errMsg)
    });
  });

  req.on('error', (e) => {
    return callback(`problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();

}

module.exports = sendToSendgrid;
