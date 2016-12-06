var Datastore = require('nedb');

var tempsDB = new Datastore({filename: './tempsDB/temps.tempsDB', autoload: true});
var notificationDB = new Datastore({filename: './tempsDB/notification.tempsDB', autoload: true});

/**
 * delete docs older than two hours from database
 * @param db
 */
var cleanupTempDatabase = function () {
    var twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
    twoHoursAgo = twoHoursAgo.getTime();
    tempsDB.remove({"timestamp": {$lt: twoHoursAgo}}, {multi: true}, function (err, numRemoved) {
        if (err) {
            console.error(err);
        }
    });
};

/**
 * delete all docs from database
 * @param db
 */
var deleteAllDbEntries = function () {
    tempsDB.remove({}, {multi: true}, function (err, numRemoved) {
        if (err) {
            console.error(err);
        }
    });
};

/**
 * insert into temperature database
 * @param doc
 * @param callback
 */
var insertTempsIntoDB = function (doc, callback) {
    tempsDB.insert(doc, function (err, newDoc) {
        if (err) {
            console.error(err);
        }
        if (callback) {
            callback(newDoc);
        }
    });
};

/**
 * get all temperatures from database
 * @param callback
 */
var getAllTempsFromDB = function (callback) {
    tempsDB.find({}, function (err, docs) {
        if (err) {
            console.error(err);
        }
        docs.sort(function (a, b) {
                if (a.timestamp < b.timestamp) {
                    return -1;
                }
                if (a.timestamp > b.timestamp) {
                    return 1;
                }
                return 0;
            }
        );
        if (callback) {
            callback(docs);
        }
    });
};

//================= Notification ===================
/**
 * get all temperatures from database
 * @param callback
 */
var getNotificationObjectFromDB = function (callback) {
    notificationDB.find({id: 'notifications'}, function (err, docs) {
        if (err) {
            console.error(err);
        }
        if (callback) {
            callback(docs);
        }
    });
};

/**
 * save notification object into database
 * @param callback
 */
var saveNotificationObjectIntoDB = function (notification, callback) {
    notificationDB.update({id: 'notifications'}, {
        $set: {
            email: notification.email,
            value: notification.value
        }
    }, {}, function (err, numReplaced) {
        if (err) {
            console.error(err);
            if (callback) {
                callback(err);
            }
        }
        else if (numReplaced == 0) {
            notificationDB.insert({
                id: 'notifications',
                email: notification.email,
                value: notification.value
            }, function (err, doc) {
                if (err) {
                    console.error(err);
                    if (callback) {
                        callback(err);
                    }
                }
                else {
                    //console.log("Kein Eintrag vorhanden. Neuer Eintrag angelegt! \nE-Mail: "+notification.email+" \nWert: "+notification.value);
                    if (callback) {
                        callback("success");
                    }
                }
            });
        }
        else {
            //console.log(numReplaced+" Dokument geupdated! \nE-Mail: "+notification.email+" \nWert: "+notification.value);
            if (callback) {
                callback("success");
            }
        }
    });
};

exports.cleanupTempDatabase = cleanupTempDatabase;
exports.deleteAllDbEntries = deleteAllDbEntries;
exports.getAllTempsFromDB = getAllTempsFromDB;
exports.insertTempsIntoDB = insertTempsIntoDB;

exports.getNotificationObjectFromDB = getNotificationObjectFromDB;
exports.saveNotificationObjectIntoDB = saveNotificationObjectIntoDB;