/**
 * Created by CWalt on 18.10.2016.
 */
var mail = require('./SendMail');
var Datastore = require('nedb');

var isSend = false;
var dbn = new Datastore({ filename: '../db/notification.db', autoload: true });

var saveMaxTempObject = function(notification){
    //save notification to db
    var doc = {
        timestamp: (new Date()).getTime(),
        email: notification.email,
        value: notification.value
    };

    dbn.insert(doc, function (err, newDoc) {
        if (err) { console.error(err); }
    });
    console.log("gespeichert! \nE-Mail: "+notification.email+" \nWert: "+notification.value);
};

var getMaxTempObject = function(){
    //get notification from db
    //dummy:
    var notification = {
        email: "critical@taskmanager.de",
        value: 35
    };
    return notification;
};

var checkTemp = function(temp){
    var maxTemp = getMaxTempObject();
    if(maxTemp.value && !isSend) {
        if (temp > maxTemp.value) {
            mail.send(maxTemp);
            isSend=true;
            setInterval(resetIsSend,10000);
        }
    }
};

//Reset isSend boolean
var resetIsSend = function(){
    isSend = false;
};

exports.checkTemp = checkTemp;
exports.getMaxTempObject = getMaxTempObject;
exports.saveMaxTempObject = saveMaxTempObject;