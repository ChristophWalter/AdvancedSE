/**
 * Created by traub on 10.10.2016.
 */
var cpuData = require('../AdvancedSE/Modules/CpuData');
var processData = require('../AdvancedSE/Modules/ProcessData');
var mail = require('./Modules/SendMail');
var tempNotification = require('./Modules/SaveTempNotification');
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
};
setInterval(updateData,1000);

var updateThermData = function () {
    var i = 0;
    cpuData.getcpuTempArray(thermLog.saveThermData);
    thermLog.getThermHistory(function(data) {
        console.log(data);
        if(data && data.length > 6) {
            for(var dataset in data.slice(0, 5)){
                if(dataset.temperatures) {
                    tempData[i] = dataset.temperatures[0];
                    i++;
                }
            }
            tempChart.update();
        }
    });
};
setInterval(updateThermData, 5000);

//save and send email notifications
tempNotification.save({email:"critical@taskmanager.de",value:35});
mail.send(tempNotification.get());