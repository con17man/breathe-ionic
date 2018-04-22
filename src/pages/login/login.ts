import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/login-service/login-service';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    showRegisterForm: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appCtrl: App,
        private loading: LoadingController,
        private toastCtrl: ToastController,
        private authService: AuthService
    ) {
        this.showRegisterForm = false;
    }

    ionViewDidLoad() {}

    login() {
        let user = {
            email: 'admin@smarthome.poli',
            password: 'pwd123'
        };

        const loading = this.loading.create({ content: 'Just a sec...' });
        loading.present()
            .then(() => {
                return this.authService.loginUser(user).toPromise();
            })
            .then(data => {
                console.log('>>>>>>>>>', data);
                loading.dismiss();
                // if the email is not found in the DB
                if(data === null) {
                    let toast = this.toastCtrl.create({
                        message: `This email is not registered`,
                        duration: 5000,
                        showCloseButton: true,
                        closeButtonText: `Register`
                    });

                    toast.onDidDismiss((data, role) => {
                        if (role === 'close') {
                            this.showRegisterForm = true;
                        }
                    });

                    toast.present();
                } else {
                    // TODO
                    // redirect user to main page
                }

            })
            .catch(error => {
                loading.dismiss();
                console.warn('login', error);
                let toast = this.toastCtrl.create({
                    message: `The server is not responding. Try again later.`,
                    duration: 5000
                }).present();
            });
    }



    register() {
        // mock register user
        let newUser = {
            firstName: 'Carmen',
            lastName: 'Jugarean',
            email: 'admin@smarthome.poli',
            username: 'carjug15',
            password: 'pwd123'
        };

        const loading = this.loading.create({ content: `You shall not pass! yet...` });
        loading.present()
            .then(() => {
                return this.authService.registerUser(newUser).toPromise();
            })
            .then(data => {
                console.log('register', data);
                loading.dismiss();
                this.showRegisterForm = false;
            })
            .catch(err => {
                console.warn('register', err);
                loading.dismiss();
            })
    }

}
