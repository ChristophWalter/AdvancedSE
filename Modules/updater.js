/**
 * Created by Sedi on 06.12.2016.
 */
var cpuData = require('./CpuData');
var processData = require('./ProcessData');
var thermLog = require('./ThermLog');
var tempNotification = require('./SaveTempNotification');

var updateData = function () {
    cpuData.getcpuTempArray(function (temps) {
        tempPackage = temps[1];
        console.log(temps);
        //console.log('update');
        if (tempPackage) {
            document.getElementById('Tempdata').innerHTML = tempPackage + "°C";
        }
        tempNotification.checkTemp(temps[1]);
    });
    processData.getAllProcesses(function (data) {
        processList = "";
        if (data) {
            for (process in data) {
                processList += "<li class=\"list-group-item\">" + data[process]['Caption'] + "<\/li>"
            }
            document.getElementById('processes').innerHTML = processList;
        }
        else {
            document.getElementById('processes').innerHTML = "keine laufende Prozesse"
        }
    })
};

var updateThermData = function () {
    var i = 0;
    cpuData.getcpuTempArray(thermLog.saveThermData);
    thermLog.getThermHistory(function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataset = data[i];
            if (dataset.temperatures && dataset.temperatures[0] > 0) {
                var gesTemp = dataset.temperatures.length - 1;
                var label = Math.floor(((new Date).getTime() - dataset.timestamp) / 60000);
                tempData[i] = dataset.temperatures[0];
                tempLabels[i] = "-" + label;
            } else {
                var label = Math.floor(((new Date).getTime() - dataset.timestamp) / 60000);
                tempData[i] = 0;
                tempLabels[i] = "-" + label;
            }
        }
        tempChart.update();
    });
};

exports.thermData = updateThermData;
exports.data = updateData;
