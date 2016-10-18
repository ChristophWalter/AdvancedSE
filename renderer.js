/**
 * Created by traub on 10.10.2016.
 */

var mail = require('./Modules/SendMail');
var tempNotification = require('./Modules/SaveTempNotification');

tempNotification.save({email:"critical@taskmanager.de",value:35});
mail.send(tempNotification.get());