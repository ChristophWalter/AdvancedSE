/**
 * Created by traub on 18.10.2016.
 */
var wmi = require('node-wmi');
const util = require('util');
var processes = [];
var processData;

var updateWMIData = function(callback){
    wmi.Query().namespace('root\\CIMV2').class('Win32_Process').exec(function(err, data) {
        processData = data;
        evalProcessData();
        if (callback != null){
            return callback();
        }
    });
};

var evalProcessData = function () {
    processes = processData;
}

var getProcessdata = function (callback){
    updateWMIData(function(){
        callback(processData);;
    });
}

exports.updateWMIData = updateWMIData;
exports.getAllProcesses = getProcessdata;