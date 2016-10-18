/**
 * Created by traub on 05.10.2016.
 */
var wmi = require('node-wmi');
const util = require('util');
var tempDataDiv = document.getElementById("Tempdata");
var thermalData;
var thermalArray = [];

var exec = require('child_process').exec;
exec('NET SESSION', function(err,so,se) {
    console.log(se.length === 0 ? "admin" : "not admin");
});

var getThermalData = function(){
    wmi.Query().namespace('root\\OpenHardwareMonitor').class('Sensor').exec(function(err, data) {
        thermalData = data;
        evalThermalData();
    });
};

var evalThermalData = function () {
    for(dataset in thermalData){
        dataset = thermalData[dataset];
        thermalArray[dataset['Identifier']] = dataset['Value']
    }
};