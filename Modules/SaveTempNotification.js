/**
 * Created by CWalt on 18.10.2016.
 */

exports.save = function(notification){
    //save notification to db
    //dummy:
    console.log("gespeichert! \nE-Mail: "+notification.email+" \nWert: "+notification.value);
};

exports.get = function(){
    //get notification from db
    //dummy:
    var notification = {
        email: "critical@taskmanager.de",
        value: 35
    };
    return notification;
};