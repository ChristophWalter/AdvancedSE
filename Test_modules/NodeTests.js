/**
 * Created by traub on 29.11.2016.
 */
var cpuData = require('../Modules/CpuData');
var processData = require('../Modules/ProcessData')
var test = require('unit.js');


describe('Check if Hardwaer data is available', function() {
    it('testing cpu data retrival', function(done) {
        cpuData.getcpuTempArray(function (data) {
            test.array(data)
            done();
        })
    });

    it('testing process data retrival', function(done) {
        processData.getAllProcesses(function (data) {
            test.array(data).isNot([]);
            done();
        });
    });
});
