/**
 * created by wehrstein on 18.10.16
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: './db/temps.db', autoload: true });

/**
 * add timestamp to currentThermData and store it in database
 * @param currentThermData
 */
var saveThermData = function(currentThermData) {
    var doc = {
        "timestamp": (new Date()).getTime(),
        "temperatures": currentThermData
    };

    db.insert(doc, function (err, newDoc) {
        if (err) { console.error(err); }
    });
};

/**
 * get history of last hours' temperature data
 * @param callback
 */
var getThermHistory = function(callback) {
    cleanDatabase(db);
    db.find({}, function(err, docs) {
        if (err) { console.error(err); }
        docs.sort(function(a, b) {
            if (a.timestamp < b.timestamp) { return -1; }
            if (a.timestamp > b.timestamp) { return 1; }
            return 0;}
        );
        callback(docs);
    });
    getTempArray();
};

/**
 * get temperature from last two hours with 20min frames
 * @param callback
 */
var getTempArray = function(callback) {
    cleanDatabase(db);

    var ts = (new Date()).getTime();
    var tempArray = [];
    for(var i=0;i<=120;i=i+20) {
        ts = ts-(i*60*1000);
        getTempEntry(function(entry){
            if(entry.temperatures[0]) {
                tempArray.push(entry.temperatures[0]);
            }
            else{
                tempArray.push(0);
            }
        },ts);
    }
    while(tempArray.length != 7){

        console.log(tempArray);
    }
    //return tempArray;
};

var getTempEntry = function(callback,ts){
    db.findOne({$and:[{timestamp: {$gt: ts-10000}}]}, function (err, docs) {
        if (err) {
            console.error(err);
        }
        if(docs) {
            callback(docs);
        }
        else{
            callback(0);
        }
    });
};

/**
 * delete docs older than two hours from database
 * @param db
 */
var cleanDatabase = function(db) {
    var twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours()-2);
    twoHoursAgo = twoHoursAgo.getTime();
    db.remove({ "timestamp": { $lt: twoHoursAgo } }, { multi: true }, function(err, numRemoved) {
        if (err) { console.error(err); }
    });
};

/**
 * delete all docs from database
 * @param db
 */
var deleteAllDbEntries = function(db) {
    db.remove({}, { multi: true }, function(err, numRemoved) {
        if (err) { console.error(err); }
    });
};

exports.saveThermData = saveThermData;
exports.getThermHistory = getThermHistory;