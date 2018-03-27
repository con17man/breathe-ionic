import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appCtrl: App,
        private loading: LoadingController
    ) { }


    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login() {
        const loading = this.loading.create({ content: 'Just a sec...' });
        loading.present();

        // fake login process
        setTimeout(() => {
            this.appCtrl.getRootNav().setRoot(TabsPage);
            loading.dismiss();
        }, 1500);
    }

}
