/**
 * Created by traub on 10.10.2016.
 */
var cpuData = require('../AdvancedSE/Modules/CpuData');
var processData = require('../AdvancedSE/Modules/ProcessData');
var tempNotification = require('./Modules/SaveTempNotification');
var jQuery = require('jquery');

cpuData.getcpuTempArray(function (temps) {
    console.log(temps);
});

processData.getAllProcesses(function (data) {
    console.log(data);
});

var updateData = function () {
    cpuData.getcpuTempArray(function (temps) {
        tempPackage = temps[1];
        //console.log('update');
        if(tempPackage) {
            document.getElementById('Tempdata').innerHTML = tempPackage + "°C";
        }
        tempNotification.checkTemp(temps[0]);
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
    tempNotification.getMaxTempObject(function(maxTempObject){
        if(maxTempObject) {
            if (maxTempObject.email) {
                document.getElementById("emailInput").placeholder = maxTempObject.email;
                document.getElementById("savedMail").innerText = maxTempObject.email;
            }
            if (maxTempObject.value) {
                document.getElementById("valueInput").placeholder = maxTempObject.value;
                document.getElementById("savedValue").innerText = maxTempObject.value + "°C";
            }
        }
    });
};
setPlaceholder();