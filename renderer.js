/**
 * Created by traub on 10.10.2016.
 */
var cpuData = require('../AdvancedSE/Modules/CpuData');
var processData = require('../AdvancedSE/Modules/ProcessData');
var mail = require('./Modules/SendMail');
var tempNotification = require('./Modules/SaveTempNotification');

cpuData.getcpuTempArray(function (temps) {
    console.log(temps);
});

processData.getAllProcesses(function (data) {
    console.log(data);
})

var updateData = function () {
    cpuData.getcpuTempArray(function (temps) {
        tempPackage = temps[1];
        console.log('update');
        document.getElementById('Tempdata').innerHTML = tempPackage + "°C";
    });
};
setInterval(updateData,1000);

//save and send email notifications
tempNotification.save({email:"critical@taskmanager.de",value:35});
mail.send(tempNotification.get());