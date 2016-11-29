/**
 * Created by traub on 29.11.2016.
 */
var cpuData = require('../Modules/CpuData');
var processData = require('../Modules/ProcessData');
var mail = require('../Modules/SendMail');
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

describe('Check if Mails can be sent', function() {
    it('testing mail sending with right parameter', function() {
        var parameter = {
            email:"c.walter-95@gmx.de",
            value:"60"
        };
        var response = mail.send(parameter);
        test
            .string(response)
            .is('message sent');
    });
    it('testing mail sending with wrong parameters', function() {
        var parameter = {
            email:"c.walter-95@gmx.de"
        };
        var response = mail.send(parameter);
        test
            .string(response)
            .is('wrong parameter');
    });
});
