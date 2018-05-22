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

        // INIT objects/local variables
        this.noMeasurements = false;
        this.sensorMeasurements = {};
        // INIT -- END

        this.getLastMeasurements();

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
        this.sensorService.getLastMeasurements().toPromise()
            .then(data => {
                this.sensorMeasurements = data;
                this.noMeasurements = (data) ? false : true;
            })
            .catch(err => {
                console.warn(err);
            });
    }



    /**
     * @desc navigate to a given page
     * @param {string} pageName
     * @memberof DashboardPage
     */
    goToPage(pageName: string) {
        this.navCtrl.push(pageName);
    }

}
