import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SensorService } from '../../providers/sensor-service/sensor-service';

@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {

    sensorMeasurements: any;
    noMeasurements: boolean;
    interval: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private loading: LoadingController,
        private sensorService: SensorService
    ) {
        this.noMeasurements = false;
        this.sensorMeasurements = {};

        this.getLastMeasurements();

        this.interval = setInterval(() => {
            this.getLastMeasurements();
        }, 10 * 1000);
    }

    ionViewDidLoad() { }

    ionViewDidLeave() {
        clearInterval(this.interval);
    }


    getLastMeasurements() {

        this.sensorService.getLastMeasurements().toPromise()
            .then(data => {
                if (data) {
                    this.sensorMeasurements = data;
                    this.noMeasurements = false;
                } else {
                    this.noMeasurements = true;
                }
            })
            .catch(err => {
                console.warn(err);
            });
    }

}
