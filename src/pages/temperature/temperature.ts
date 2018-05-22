import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
    selector: 'page-temperature',
    templateUrl: 'temperature.html',
})
export class TemperaturePage {

    temperatureChart: any;

    @ViewChild('temperatureCanvas') lineChart;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) { }

    ionViewDidLoad() {
        this.loadTemperatureChart();
    }


    loadTemperatureChart() {
        this.temperatureChart = new Chart(this.lineChart.nativeElement, {
            type: 'line',
            data: {
                labels: ['a', 'b', 'c'],
                datasets: [
                    {
                        label: 'Temperature',
                        data: [1, 5, 2],
                        backgroundColor: "rgba(105, 184, 214, 0.3)",
                        borderColor: "#69B8D6",
                        pointBorderColor: "#69B8D6",
                        pointHoverBackgroundColor: "#69B8D6"
                    }
                ]
            }
        })
    }

}
