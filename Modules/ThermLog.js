/**
 * created by wehrstein on 18.10.16
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: '../db/temps.db', autoload: true });

var saveThermData = function(currentThermData) {
    var doc = {
        "timestamp": (new Date()).getTime(),
        "temperatures": currentThermData
    };

    db.insert(doc, function (err, newDoc) {
        if (err) { console.error(err); }
    });
};

var getThermHistory = function(callback) {
    cleanDatabase(db);

    var dbEntry = {};
    db.find({}, function(err, docs) {
        if (err) { console.error(err); }
        callback(docs);
    });
};

var cleanDatabase = function(db) {
    var twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours()-2);
    twoHoursAgo = twoHoursAgo.getTime();
    db.remove({ "timestamp": { $lt: twoHoursAgo } }, { multi: true }, function(err, numRemoved) {
        if (err) { console.error(err); }
    });
};

exports.saveThermData = saveThermData;
exports.getThermHistory = getThermHistory;