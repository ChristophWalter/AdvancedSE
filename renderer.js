/**
 * Created by traub on 10.10.2016.
 */
var updater = require('./Modules/updater.js');
var domManipulater = require('./Modules/domManipulater');

setInterval(updater.data,1000);

updater.thermData();
setInterval(updater.thermData, 5000);

domManipulater.placeholder();
