/**
 * Created by Sedi on 06.12.2016.
 */
var tempNotification = require('./SaveTempNotification');
//input button function
var tempButton = function(){
    var inputEmail = document.getElementById("emailInput").value;
    var inputValue = document.getElementById("valueInput").value;

    //save email notification object
    tempNotification.saveMaxTempObject({email:inputEmail,value:inputValue});

    //clear fields
    document.getElementById("emailInput").value = "";
    document.getElementById("valueInput").value = "";

    setPlaceholder();
};
//set placeholder for saved values
var setPlaceholder = function(){
    //set placeholder von Database
    tempNotification.getMaxTempObject(function(maxTempObject){
        if(maxTempObject) {
            document.getElementById("emailInput").placeholder = maxTempObject.email;
            document.getElementById("savedMail").innerText = maxTempObject.email;

            document.getElementById("valueInput").placeholder = maxTempObject.value;
            document.getElementById("savedValue").innerText = maxTempObject.value + "°C";
        }
    });
};
setPlaceholder();

exports.placeholder = setPlaceholder;
exports.tempButton = tempButton;