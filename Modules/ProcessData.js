/**
 * Created by traub on 18.10.2016.
 */
const util = require('util');
var wmiUpdater = require('./WmiDataRetriever');



var getProcessdata = function (callback){
    wmiUpdater.updateProcData(function(pData){
        callback(pData);
    });
};


exports.getAllProcesses = getProcessdata;