/**
 * Created by traub on 06.12.2016.
 */
var wmi = require('node-wmi');

var thermalData;
var thermalArray = [];
var processes = [];
var processData;

var evalThermalData = function () {
    for(dataset in thermalData){
        dataset = thermalData[dataset];
        thermalArray[dataset['Identifier']] = dataset['Value']
    }
};

var evalProcessData = function () {
    processes = processData;
};

var updateWMIData = function(callback){
    wmi.Query().namespace('root\\OpenHardwareMonitor').class('Sensor').exec(function(err, data) {
        thermalData = data;
        evalThermalData();
        if (callback != null){
            return callback();
        }
    });
};

var updateWMIData2 = function(callback){
    wmi.Query().namespace('root\\CIMV2').class('Win32_Process').exec(function(err, data) {
        processData = data;
        evalProcessData();
        if (callback != null){
            return callback(processData);
        }
    });
};


exports.updateOPHData = updateWMIData;
exports.tArray = thermalArray;
exports.updateProcData = updateWMIData2;