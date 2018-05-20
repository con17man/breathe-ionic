import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { UtilsService } from '../../providers/utils-service/utils-service';
import { UserService } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
    selector: 'page-auth',
    templateUrl: 'auth.html',
})
export class AuthPage {

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
        private authService: AuthService,
        private utils: UtilsService,
        private userService: UserService
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

                if(data.errorMsg) {
                    this.utils.showSimpleToast(data.errorMsg);
                } else {
                    this.utils.showSimpleToast(`Hi ${data.firstName}! Welcome back!`);
                    // save user data
                    this.userService.setUser(data);
                    // redirect to dashboard
                    this.appCtrl.navPop();
                    this.navCtrl.setRoot('DashboardPage');
                }

            })
            .catch(error => {
                this.utils.showSimpleToast(`The server is not responding. Try again later.`);
                console.warn('login', error);
            })
            .then(() => {
                loading.dismiss();
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
                if(data.errorMsg) {
                    this.utils.showSimpleToast(data.errorMsg);
                } else {
                    this.toggleLoginRegisterForm();
                    this.utils.showSimpleToast(`You've registered successfully`);
                }
            })
            .catch(err => {
                console.warn('register', err);
            })
            .then(() => {
                loading.dismiss();
            });
    }

}
