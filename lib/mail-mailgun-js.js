/**
 * Created by qaiser on 2/12/2016.
 */
'use strict';

var https = require('https');
var Mailgun = require('mailgun-js');
var prepareMailgunData = require('./prepare-mailgun-data');

const MAILGUN_API_KEY = 'key-89f454de0e308c90d98194d7ba3245ec';
const MAILGUN_DOMAIN = 'sandboxf890a2b2f24440afaa8a4372ae940009.mailgun.org';

function sendToMailgunJs(mailData, callback) {

  let mailgun = new Mailgun({apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN});

  var postData = prepareMailgunData(mailData);

  mailgun.messages().send(postData, callback);

}

module.exports = sendToMailgunJs;
