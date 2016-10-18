/**
 * Created by CWalt on 18.10.2016.
 */
var mail = require('./SendMail');
var isSend = false;

var saveMaxTempObject = function(notification){
    //save notification to db
    //dummy:
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