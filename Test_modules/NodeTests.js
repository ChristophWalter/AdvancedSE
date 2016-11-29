/**
 * Created by traub on 29.11.2016.
 */
var cpuData = require('../Modules/CpuData');
var processData = require('../Modules/ProcessData');
var test = require('unit.js');
var saveTempNotification = require('../Modules/SaveTempNotification');


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

describe('Check DB actions', function() {
    it('testing if max temp is saved', function(done){
        //test notification
        var notification = {
            email: "test@test.com",
            value: 50
        };

        saveTempNotification.saveMaxTempObject(notification, function (data) {
            test
                .string(data)
                .is('success');
            done();
        });
    });

    it('testing max temp retrival', function(done) {
        saveTempNotification.getMaxTempObject(function (data) {
            test
                .object(data)
                .hasProperty('email')
                .hasProperty('value');
            done();
        });
    });
});
