var express = require('express');
var bodyParser = require('body-parser');
var sendToSendgrid = require('./lib/mail-sendgrid');
var sendToMailgun = require('./lib/mail-mailgun');
var sendToMailgunJs = require('./lib/mail-mailgun-js')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.send('Server working!')
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/send-mail', function (req, res) {

  sendToSendgrid(req.body, function (err) {

    if (err) {

      sendToMailgunJs(req.body, function (err) {  // sendToMailgun doesn't work: "'from' parameter is missing"

        if (err) {
          const message = (err.message.indexOf('Sandbox subdomains are for test purposes only') !== -1)
                          ? 'Email not included in Mailgun\'s authorized recipients.' : 'Failed to send email';

          return res.status(400).send({success: false, provider: 'Mailgun', message})
        }

        res.status(200).send({success: true, provider: 'Mailgun', message: 'Message sent'})

      });
    } else {

      res.status(200).send({ success: true, provider: 'SendGrid', message: 'Message sent'})

    }
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});