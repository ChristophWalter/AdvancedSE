/**
 * Created by traub on 05.10.2016.
 */
const util = require('util');
var wmiUpdater = require('./WmiDataRetriever');






var getCpuTemps= function (callback) {
    wmiUpdater.updateOPHData(function () {
        cpuTemps = [];
        var i = 0;
        for(key in wmiUpdater.tArray){
            if(key.search("intelcpu/0/temperature") != -1){
                cpuTemps[i]=wmiUpdater.tArray[key];
                i++;
            }
        }
        callback(cpuTemps);
    });
};


exports.getcpuTempArray = getCpuTemps;