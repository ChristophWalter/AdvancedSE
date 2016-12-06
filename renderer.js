/**
 * Created by traub on 10.10.2016.
 */
var updater = require('./Modules/updater.js');
var mail = require('./Modules/SendMail');
var exportExcelFile = require('./Modules/exportExcelFile');
var domManipulater = require('./Modules/domManipulater');
var tempNotification = require('./Modules/SaveTempNotification');

var jQuery = require('jquery');
var processList = "";


setInterval(updater.data,1000);

updater.thermData();
setInterval(updater.thermData, 5000);

domManipulater.placeholder();
