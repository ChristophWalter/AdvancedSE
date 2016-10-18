/**
 * Created by CWalt on 18.10.2016.
 */
//install http://nilhcem.github.io/FakeSMTP/

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtp://localhost');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"TaskManager" <localhost>', // sender address
    to: '', // list of receivers
    subject: 'CRITICAL!', // Subject line
    text: '' // plaintext body
};

exports.send = function(notification){
    //update mail options
    mailOptions.to=notification.email;
    mailOptions.text=
        "Achtung, die Temperatur übersteigt "+
        notification.value+"°C";
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: '+info.response);
    });
};
