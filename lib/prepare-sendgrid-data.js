/**
 * Created by qaiser on 5/12/2016.
 */
'use strict';

const FROM = 'qais110@gmail.com';
const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

function prepareSendgridData({to, cc, bcc, subject, body}) {

  var postData = {
    personalizations: [{
      to : to.replace(/\s/g, '').split(',')
              .filter(e => EMAIL_REGEXP.test(e))
              .map(e => {return {email: e}})
    }],
    from : {email: FROM},
    subject,
    content : [{type: "text/plain", value: body}]
  };

  if (cc) {
    postData.personalizations[0].cc  = cc.replace(/\s/g, '').split(',')
        .filter(e => EMAIL_REGEXP.test(e))
        .map(e => {return {email: e}});
  }
  if (bcc) {
    postData.personalizations[0].bcc = bcc.replace(/\s/g, '').split(',')
        .filter(e => EMAIL_REGEXP.test(e))
        .map(e => {return {email: e}});
  }

  return JSON.stringify(postData);

}

module.exports = prepareSendgridData;
