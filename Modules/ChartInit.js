/**
 * initialize line chart for a given chartID
 * @param chartID
 */

var initChart = function(chartID){
    tempData = [];
    tempLabels = [];
    var ctx = document.getElementById(chartID);
    var tempChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tempLabels,
            datasets: [{
                label: "CPU Temp",
                data: tempData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointRadius: 0,
                pointHoverRadius: 0,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        autoSkip: true
                    },
                    position: "right",
                    scaleLabel: {
                        display: true,
                        labelString: "Temperatur in °C"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Minuten"
                    },
                    gridLines: {
                        display: false
                    },
                    ticks:{
                        display: false
                    }
                }]
            }
        }
    });
    return tempChart;
};

// call the chart initialization function with the ID: tempChart
var tempChart = initChart("tempChart");

module.exports.initChart = initChart;
module.exports.tempChart = tempChart;



