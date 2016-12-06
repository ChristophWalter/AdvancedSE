var Datastore = require('nedb');

var db = new Datastore({filename: './db/temps.db', autoload: true});
var dbn = new Datastore({filename: './db/notification.db', autoload: true});

/**
 * delete docs older than two hours from database
 * @param db
 */
var cleanupTempDatabase = function () {
    var twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
    twoHoursAgo = twoHoursAgo.getTime();
    db.remove({"timestamp": {$lt: twoHoursAgo}}, {multi: true}, function (err, numRemoved) {
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
    db.remove({}, {multi: true}, function (err, numRemoved) {
        if (err) {
            console.error(err);
        }
    });
};

/**
 * insert into temperature database
 */
var insertTempsIntoDB = function (doc, callback) {
    db.insert(doc, function (err, newDoc) {
        if (err) {
            console.error(err);
        }
        if (callback) {
            callback(newDoc);
        }
    });
};

var getAllTempsFromDB = function (callback) {
    db.find({}, function (err, docs) {
        if (err) {
            console.error(err);
        }
        if (callback) {
            callback(docs);
        }
    });
};


exports.cleanupTempDatabase = cleanupTempDatabase;
exports.deleteAllDbEntries = deleteAllDbEntries;
exports.getAllTempsFromDB = getAllTempsFromDB;
exports.insertTempsIntoDB = insertTempsIntoDB;