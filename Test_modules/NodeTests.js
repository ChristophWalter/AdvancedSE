/**
 * Created by traub on 29.11.2016.
 */
var cpuData = require('../Modules/CpuData');
var processData = require('../Modules/ProcessData')
var test = require('unit.js');


describe('Check if Hardware data is available', function() {
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
