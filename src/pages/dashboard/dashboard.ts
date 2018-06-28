import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SensorService } from '../../providers/sensor-service/sensor-service';
import { UtilsService } from '../../providers/utils-service/utils-service';

@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {

    sensorMeasurements: any;
    noMeasurements: boolean;
    interval: any;
    limits: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private sensorService: SensorService,
        private utilsService: UtilsService
    ) {

        // INIT objects/local variables
        this.noMeasurements = false;
        this.sensorMeasurements = {};
        this.limits = {};
        // INIT -- END

        this.getLastMeasurements()
            .then(() => {
                if (!this.limits.tmpNotif && !this.limits.hmdNotif && !this.limits.smkNotif) {
                    this.utilsService.showSimpleToast(`Sensor alerts are turned off. Go to Profile page to turn them on.`, 4000);
                }
            })

        this.interval = setInterval(() => {
            this.getLastMeasurements();

        }, 10 * 1000);
    }

    ionViewDidLoad() { }

    // when the user leaves the page, stop fetching data from server
    ionViewDidLeave() {
        clearInterval(this.interval);
    }



    /**
     * @desc fetch the last measurements registered in the DB by rPi board
     * if there's no data hide the dashboard and show 'no-data-message'
     * @memberof DashboardPage
     */
    getLastMeasurements() {

        return new Promise((resolve, reject) => {
            this.sensorService.getLastMeasurements()
                .toPromise()
                .then(data => {
                    this.noMeasurements = (data) ? false : true;

                    if (data) {
                        this.sensorMeasurements = data;
                    } else {
                        clearInterval(this.interval);
                    }
                })
                .then(() => {
                    return this.sensorService.getSensorLimits().toPromise();
                })
                .then(data => {
                    this.limits = data;
                })
                .then(() => {
                    if (this.limits.tmpNotif && (this.sensorMeasurements.temperature > this.limits.tmpVal)) {
                        this.utilsService.showAlertToast(`⚠ Temperature is ${this.sensorMeasurements.temperature - this.limits.tmpVal} °C above the limit`);
                    }

                    if (this.limits.hmdNotif && (this.sensorMeasurements.humidity > this.limits.hmdVal)) {
                        this.utilsService.showAlertToast(`⚠ Alert! Humidity level is above the limit`);
                    }

                    if (this.limits.smkNotif && (this.sensorMeasurements.gas_smoke > this.limits.smkVal)) {
                        this.utilsService.showAlertToast(`⚠ Alert! Smoke level is over critical level`);
                    }

                })
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    console.warn(err);
                    reject();
                });

        });

    }



    doRefresh(refresher) {
        this.getLastMeasurements();
        refresher.complete();
    }



    /**
     * @desc navigate to a given page
     * @param {string} pageName
     * @memberof DashboardPage
     */
    goToPage(sensorType: string) {
        this.navCtrl.push('SensorPage', {
            'sensorType': sensorType
        });
    }

}
