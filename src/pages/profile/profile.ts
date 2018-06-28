import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserService } from '../../providers/user-service/user-service';
import { SensorService } from '../../providers/sensor-service/sensor-service';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    user: any;
    limits: any;
    sensorsEnabled: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userService: UserService,
        private sensorService: SensorService,
        private loadingCtrl: LoadingController
    ) {

        this.user = {};
        this.limits = {};

        const loading = this.loadingCtrl.create({
            content: 'Loading your settings...'
        });

        loading.present()
            .then(() => {
                return this.sensorService.getSensorLimits().toPromise();
            })
            .then(data => {
                this.limits = data;
            })
            .then(() => {
                return this.userService.getUser();
            })
            .then(user => {
                this.user = user;
            })
            .catch(err => {
                console.warn(err);
            })
            .then(() => {
                loading.dismiss();
            })
    }

    ionViewDidLoad() { }


    updateSensorLimits() {

        const loading = this.loadingCtrl.create({
            content: 'Saving your changes...'
        });

        loading.present()
            .then(() => {
                return this.sensorService.updateSensorLimits(this.limits).toPromise();
            })
            .then(data => {
                console.log('update limits', data);
            })
            .then(() => {
                return this.sensorService.getSensorLimits().toPromise();
            })
            .then(data => {
                this.limits = data;
            })
            .catch(err => {
                console.warn(err);
            })
            .then(() => {
                loading.dismiss();
            });

    }



}
