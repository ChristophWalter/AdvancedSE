/**
 * Created by traub on 10.10.2016.
 */
var cpuData = require('../AdvancedSE/Modules/CpuData');
var processData = require('../AdvancedSE/Modules/ProcessData');
var thermLog = require('../AdvancedSE/Modules/ThermLog');

cpuData.getcpuTempArray(function (temps) {
    console.log(temps);
});

processData.getAllProcesses(function (data) {
    console.log(data);
});

var updateData = function () {
    cpuData.getcpuTempArray(function (temps) {
        tempPackage = temps[1];
        console.log('update');
        if(tempPackage) {
            document.getElementById('Tempdata').innerHTML = tempPackage + "°C";
        }
    });
    processData.getAllProcesses(function (data) {
        document.getElementById('processes').innerHTML = "";
        if(data) {
            for (process in data) {
                document.getElementById('processes').innerHTML += "<li class=\"list-group-item\">" + data[process]['Caption'] + "<\/li>"
            }
        }
        else{
            document.getElementById('processes').innerHTML = "no running processes"
        }
    })
    cpuData.getcpuTempArray(thermLog.saveThermData);
    thermLog.getThermHistory(function(data) {
        console.log(data);
    });
};
setInterval(updateData,1000);