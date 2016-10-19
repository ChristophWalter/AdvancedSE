/**
 * Created by Sedi on 18.10.2016.
 */
const {dialog} = require("electron").remote;  // requirement for dialog
var Excel = require("exceljs");
var processData = require("./ProcessData");
var fs = require("fs");


var exportExcelFile = function () {


    processData.getAllProcesses(function (data) {
        var content = data;

        if (content) {
            var options = {}; //Defining Options of SaveAsDialog
            options.title = " Exceldatei Speichern";
            options.buttonLabel = "Speichern";
            options.filters = [
                {name: "Excel-Arbeitsmappe(*.xlsx)", extensions: ["xlsx"]},
                {name: "Alle Dateien", extensions: ["*"]}
            ];


            dialog.showSaveDialog(options, function (fileName) {

                var workbook = new Excel.Workbook();
                var sheet = workbook.addWorksheet("Statistics");
                //Determines header and content rows by content object
                var header = Object.keys(content[0]);
                var getRows = function () {
                    var rows = [];
                    for (var i = 0; i < content.length; i++) {
                        //Map function which gets the values of objects (ECMAScript 6)
                        rows.push(Object.keys(content[i]).map(key => content[i][key]));
                    }
                    return rows;
                };

                sheet.addRow(header);
                sheet.addRows(getRows());

                //Styling
                sheet.getRow(1).border = {
                    bottom: {style: "thick"}
                };


                if (fileName === undefined) {
                    alert("Die Datei wurde nicht gespeichert");
                    console.log("Der Dateipfad wurde nicht bestimmt");
                }

                workbook.xlsx.writeFile(fileName);
                alert("Die Datei wurde erfolgreich gespeichert");
            });

        } else {
            alert("Es bestehen keine laufende Prozesse");
        }

    });

};

exports.exportExcelFile = exportExcelFile;