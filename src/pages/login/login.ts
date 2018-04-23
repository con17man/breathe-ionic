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

    loginCredentials: any = {
        username: '',
        password: ''
    };

    registerCredentials: any = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        username: ''
    };

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

    /**
     * @description switch between login & register form; reset username & pwd
     * @memberof LoginPage
     */
    toggleLoginRegisterForm() {
        this.showRegisterForm = !this.showRegisterForm;
        this.loginCredentials = {};
        this.registerCredentials = {};
    }



    /**
     * @description check if user is registered in DB & do the login
     * @memberof LoginPage
     */
    login() {

        const loading = this.loading.create({ content: 'Just a sec...' });
        loading.present()
            .then(() => {
                return this.authService.loginUser(this.loginCredentials).toPromise();
            })
            .then(data => {
                console.log('>>>>>>>>>', data);
                loading.dismiss();
                // if the email is not found in the DB
                if(data === null) {
                    let toast = this.toastCtrl.create({
                        message: `This user is not registered`,
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
                    this.appCtrl.navPop()
                    this.navCtrl.setRoot('HomePage');
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



    /**
     * @description add user into the DB
     * @memberof LoginPage
     */
    register() {

        const loading = this.loading.create({ content: `Distracted by cat gifs` });
        loading.present()
            .then(() => {
                return this.authService.registerUser(this.registerCredentials).toPromise();
            })
            .then(data => {
                loading.dismiss();
                this.toggleLoginRegisterForm();
                let toast = this.toastCtrl.create({
                    message: `You've registered successfully`,
                    duration: 5000
                }).present();
            })
            .catch(err => {
                console.warn('register', err);
                loading.dismiss();
            })
    }

}
