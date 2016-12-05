/**
 * Created by qaiser on 5/12/2016.
 */
'use strict';

const FROM = 'mailgun@sandboxf890a2b2f24440afaa8a4372ae940009.mailgun.org';
const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

function prepareMailgunData({to, cc, bcc, subject, body}) {

  var postData = {
    to : to.replace(/\s/g, '').split(',').filter(e => EMAIL_REGEXP.test(e)),
    from : FROM,
    subject,
    text : body
  };

  if (cc) {
    cc  = cc.replace(/\s/g, '').split(',').filter(e => EMAIL_REGEXP.test(e));
    if (cc.length) {
      postData.cc = cc;
    }
  }
  if (bcc) {
    bcc  = bcc.replace(/\s/g, '').split(',').filter(e => EMAIL_REGEXP.test(e));
    if (bcc.length) {
      postData.bcc = bcc;
    }
  }

  return postData;

}

module.exports = prepareMailgunData;
