/**
 * created by wehrstein on 18.10.16
 */
var databaseAccess = require('./DatabaseAccess');

/**
 * add timestamp to currentThermData and store it in database
 * @param currentThermData
 * @param callback
 */
var saveThermData = function(currentThermData, callback) {
    var doc = {
        "timestamp": (new Date()).getTime(),
        "temperatures": currentThermData
    };
    if (callback) {
        databaseAccess.insertTempsIntoDB(doc, callback);
    } else {
        databaseAccess.insertTempsIntoDB(doc, callback);
    }
};

/**
 * get history of last hours' temperature data
 * @param callback
 */
var getThermHistory = function(callback) {
    databaseAccess.cleanupTempDatabase();
    databaseAccess.getAllTempsFromDB(callback);
};

exports.saveThermData = saveThermData;
exports.getThermHistory = getThermHistory;