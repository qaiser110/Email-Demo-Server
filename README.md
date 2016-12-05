
## Introduction

This repository contains the server-side code for [Email-Demo-Client](https://github.com/qaiser110/Email-Demo-Client) app. The server-side code consists of a single endpoint `'/send-mail'` that uses Sendgrid email delivery system to send the email messages. In case Sendgrid fails to send the mail and returns an error, it falls back to using Mailgun for the delivery of emails.

### Pre-requisites

- [Node.js](https://nodejs.org/en/download/) should be installed

### Download and Installation

To install and run the client-side app, run these command in the terminal

Clone the repo:

`git clone https://github.com/qaiser110/Email-Demo-Server.git`

Change into the cloned directory, and install the npm and bower dependencies:

`cd Email-Demo-Server`

`npm install`

Once the dependencies are installed, run `npm start`
