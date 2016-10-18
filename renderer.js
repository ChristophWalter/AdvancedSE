/**
 * Created by traub on 10.10.2016.
 */
var cpuData = require('../AdvancedSE/Modules/CpuData');
var processData = require('../AdvancedSE/Modules/ProcessData');
var tempNotification = require('./Modules/SaveTempNotification');

cpuData.getcpuTempArray(function (temps) {
    console.log(temps);
});

processData.getAllProcesses(function (data) {
    console.log(data);
});

var updateData = function () {
    cpuData.getcpuTempArray(function (temps) {
        tempPackage = temps[0];
        console.log('update');
        document.getElementById('Tempdata').innerHTML = tempPackage + "°C";
        //tempNotification.checkTemp(temps[0]);
        //dummy: email if temp above 35
        tempNotification.checkTemp(34);
    });
    processData.getAllProcesses(function (data) {
        document.getElementById('processes').innerHTML = "";
        for(process in data){
            document.getElementById('processes').innerHTML += "<li class=\"list-group-item\">"+ data[process]['Caption']+"<\/li>"
        }
    })
};
setInterval(updateData,1000);

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