/**
 * Created by qaiser on 2/12/2016.
 */
'use strict';

var https = require('https');
var prepareMailgunData = require('./prepare-mailgun-data');

const MAILGUN_API_KEY = 'key-89f454de0e308c90d98194d7ba3245ec';
const MAILGUN_DOMAIN = 'sandboxf890a2b2f24440afaa8a4372ae940009.mailgun.org';
const MAILGUN_HOST = 'api.mailgun.net';

function sendToMailgun(mailData, callback) {

  var errMsg;
  var postData = prepareMailgunData(mailData);

  var options = {
    auth: `api:${MAILGUN_API_KEY}`,
    host: `${MAILGUN_HOST}`,
    path: `/v3/${MAILGUN_DOMAIN}/messages`,
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  };

  var req = https.request(options, res => {
    res.on('data', data => {
      if (data) {
        data =  JSON.parse(data);
        if (data.message && data.message === "'from' parameter is missing") {
          errMsg = data.message;
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

  req.on('error', e => {
    return callback(`problem with request: ${e.message}`);
  });

  postData = JSON.stringify(postData);
  req.write(postData);
  req.end();

}

module.exports = sendToMailgun;
