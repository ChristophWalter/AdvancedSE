/**
 * Created by CWalt on 18.10.2016.
 */
var mail = require('./SendMail');
var databaseAccess = require('./DatabaseAccess');

var isSend = false;

var saveMaxTempObject = function(notification, callback){
    databaseAccess.saveNotificationObjectIntoDB(notification, callback);
};

var getMaxTempObject = function(callback){
    databaseAccess.getNotificationObjectFromDB(function(docs){
        if(docs[0]) {
            var notification = {
                email: docs[0].email,
                value: docs[0].value
            };
            callback(notification);
        }
        else{
            callback();
        }
    });
};

var checkTemp = function(temp){
    getMaxTempObject(function(maxTemp){
        if(maxTemp && maxTemp.value && !isSend) {
            if (temp > maxTemp.value) {
                mail.send(maxTemp);
                isSend=true;
                //set email interval for critical temperatures
                setInterval(resetIsSend,50000);
            }
        }
    });
};

//Reset isSend boolean
var resetIsSend = function(){
    isSend = false;
};

exports.checkTemp = checkTemp;
exports.getMaxTempObject = getMaxTempObject;
exports.saveMaxTempObject = saveMaxTempObject;