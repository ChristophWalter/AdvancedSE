/**
 * Created by traub on 29.11.2016.
 */
var test = require('unit.js');
var thermLog = require('../Modules/ThermLog');
var cpuData = require('../Modules/CpuData');
var processData = require('../Modules/ProcessData');
var mail = require('../Modules/SendMail');
var Excel = require("exceljs");

describe('Check if Hardware data is available', function() {
    it('testing cpu data retrival', function(done) {
        cpuData.getcpuTempArray(function (data) {
            test.array(data);
            done();
        })
    });

    it('testing process data retrival', function(done) {
        processData.getAllProcesses(function (data) {
            test.array(data).isNot([]);
            done();
        });
    });

    it('test if electron is working', function() {
        const {app, BrowserWindow} = require('electron');
        test.assert(app !== undefined);
        test.assert(BrowserWindow != undefined);
    });

    it('test if window is opening', function() {
        const {app, BrowserWindow} = require('electron');
        var win = new BrowserWindow({width: 800, height: 600, frame: true});
        test.assert(win !== undefined);
    });
});

describe('Check if excel is accessible', function () {

    it('testing excel workbook build', function(){
        var workbook = new Excel.Workbook();
        test.object(workbook).isNotEmpty();
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

describe('Test database functionalities', function() {
    it('Check type of database entries', function(done) {
        thermLog.getThermHistory(function(value) {
            test.array(value);
            done();
        });
    });

    it('Test db insert', function(done) {
        var testTemp = 12;
        thermLog.saveThermData(testTemp, function(doc) {
            test.assert(doc.temperatures === testTemp);
            done();
        });
    });
});