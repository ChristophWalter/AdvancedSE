/**
 * Created by CWalt on 18.10.2016.
 */
var mail = require('./SendMail');
var Datastore = require('nedb');

var isSend = false;
var dbn = new Datastore({ filename: './db/notification.db', autoload: true });

var saveMaxTempObject = function(notification, callback){
    // save to db
    dbn.update({ id: 'notifications' }, { $set: { email: notification.email, value: notification.value } } , {}, function (err, numReplaced) {
        if (err) {
            console.error(err);
            callback(err);
        }
        else if(numReplaced == 0){
            dbn.insert({ id: 'notifications', email: notification.email, value: notification.value }, function (err, doc) {
                if (err) {
                    console.error(err);
                    callback(err);
                }
                else{
                    console.log("Kein Eintrag vorhanden. Neuer Eintrag angelegt! \nE-Mail: "+notification.email+" \nWert: "+notification.value);
                    callback("success");
                }
            });
        }
        else{
            console.log(numReplaced+" Dokument geupdated! \nE-Mail: "+notification.email+" \nWert: "+notification.value);
            callback("success");
        }
    });
};

var getMaxTempObject = function(callback){
    //get notification from db
    dbn.find({ id: 'notifications' }, function (err, docs) {
        if(docs[0]) {
            notification = {
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