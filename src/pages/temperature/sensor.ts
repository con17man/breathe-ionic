import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { SensorService } from '../../providers/sensor-service/sensor-service';

@IonicPage({
    segment: 'sensor/:sensorType'
})
@Component({
    selector: 'page-sensor',
    templateUrl: 'sensor.html',
})
export class SensorPage {

    lastSensor: any;
    sensorType: string;
    noSensorData: boolean;

    @ViewChild('sensorCanvas') lineChart;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private sensorService: SensorService,
        private loadingCtrl: LoadingController,
        private appCtrl: App
    ) {
        this.noSensorData = false;
        this.sensorType = this.navParams.get('sensorType');

        this.renderSensorContent();
    }

    ionViewDidLoad() {}


    doRefresh(refresher) {
        this.renderSensorContent();
        refresher.complete();
    }


    renderSensorContent() {
        let loading = this.loadingCtrl.create({
            content: `Fetching sensor data...`
        });

        loading.present()
            .then(() => {
                return this.sensorService.getSensorTypeMeasurements(this.sensorType).toPromise();
            })
            .then(result => {
                if (result.lastRecord) {
                    this.noSensorData = false;
                    this.sensorService.renderSensorChart(result, this.sensorType, this.lineChart.nativeElement);
                } else {
                    this.noSensorData = true;
                }
            })
            .catch(err => {
                console.log('error', err);
            })
            .then(() => {
                loading.dismiss();
            });
    }


    goToDashboard() {
        this.appCtrl.getRootNav().setRoot('DashboardPage');
    }

}
