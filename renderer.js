/**
 * Created by traub on 10.10.2016.
 */
var cpuData = require('../AdvancedSE/Modules/CpuData');
var processData = require('../AdvancedSE/Modules/ProcessData');

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
    processData.getAllProcesses(function (data) {
        document.getElementById('processes').innerHTML = "";
        for(process in data){
            document.getElementById('processes').innerHTML += "<li class=\"list-group-item\">"+ data[process]['Caption']+"<\/li>"
        }
    })
};
setInterval(updateData,1000);