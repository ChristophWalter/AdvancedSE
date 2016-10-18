/**
 * Created by traub on 05.10.2016.
 */
var wmi = require('node-wmi');
const util = require('util');
var thermalData;
var thermalArray = [];

var updateWMIData = function(callback){
    wmi.Query().namespace('root\\OpenHardwareMonitor').class('Sensor').exec(function(err, data) {
        thermalData = data;
        evalThermalData();
        if (callback != null){
            return callback();
        }
    });
};

var evalThermalData = function () {
    for(dataset in thermalData){
        dataset = thermalData[dataset];
        thermalArray[dataset['Identifier']] = dataset['Value']
    }
};


var getCpuTemps= function (callback) {
    updateWMIData(function () {
        cpuTemps = [];
        var i = 0;
        for(key in thermalArray){
            if(key.search("intelcpu/0/temperature") != -1){
                cpuTemps[i]=thermalArray[key];
            }
            i++;
        }
        callback(cpuTemps);
    });
}

exports.updateWMIData = updateWMIData;
exports.getcpuTempArray = getCpuTemps;