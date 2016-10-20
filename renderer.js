/**
 * Created by traub on 10.10.2016.
 */
var cpuData = require('../AdvancedSE/Modules/CpuData');
var processData = require('../AdvancedSE/Modules/ProcessData');
var mail = require('./Modules/SendMail');
var exportExcelFile = require('../AdvancedSE/Modules/exportExcelFile');
var tempNotification = require('./Modules/SaveTempNotification');
var thermLog = require('../AdvancedSE/Modules/ThermLog');
var jQuery = require('jquery');

cpuData.getcpuTempArray(function (temps) {
//    console.log(temps);
});

processData.getAllProcesses(function (data) {
//    console.log(data);
});

var updateData = function () {
    cpuData.getcpuTempArray(function (temps) {
        tempPackage = temps[1];
        //console.log('update');
        if(tempPackage) {
            document.getElementById('Tempdata').innerHTML = tempPackage + "°C";
        }
        //tempNotification.checkTemp(temps[0]);
        //dummy: email if temp above 35
        tempNotification.checkTemp(34);
    });
    processData.getAllProcesses(function (data) {
        document.getElementById('processes').innerHTML = "";
        if(data) {
            for (process in data) {
                document.getElementById('processes').innerHTML += "<li class=\"list-group-item\">" + data[process]['Caption'] + "<\/li>"
            }
        }
        else{
            document.getElementById('processes').innerHTML = "keine laufende Prozesse"
        }
    })
};
setInterval(updateData,1000);

var updateThermData = function () {
    var i = 0;
    cpuData.getcpuTempArray(thermLog.saveThermData);
    thermLog.getThermHistory(function(data) {
        for (var i=0; i<data.length; i++) {
            var dataset = data[i];
            if (dataset.temperatures && dataset.temperatures[0] > 0) {
                var gesTemp = dataset.temperatures.length - 1;
                var label = Math.floor(((new Date).getTime() - dataset.timestamp) / 60000);
                tempData[i] = dataset.temperatures[0];
                tempLabels[i] = "-" + label;
            } else {
                var label = Math.floor(((new Date).getTime() - dataset.timestamp) / 60000);
                tempData[i] = 0;
                tempLabels[i] = "-" + label + "min";
            }
        }
        tempChart.update();
    });
};
updateThermData();
setInterval(updateThermData, 1000);


//input button function
var tempButton = function(){
    var inputEmail = document.getElementById("emailInput").value;
    var inputValue = document.getElementById("valueInput").value;

    //save email notification object
    tempNotification.saveMaxTempObject({email:inputEmail,value:inputValue});

    //clear fields
    document.getElementById("emailInput").value = "";
    document.getElementById("valueInput").value = "";

    setPlaceholder();
};
//set placeholder for saved values
var setPlaceholder = function(){
    //set placeholder von Database
    if (tempNotification.getMaxTempObject().email) {
        document.getElementById("emailInput").placeholder = tempNotification.getMaxTempObject().email;
    }
    if (tempNotification.getMaxTempObject().value) {
        document.getElementById("valueInput").placeholder = tempNotification.getMaxTempObject().value;
    }
};
setPlaceholder();