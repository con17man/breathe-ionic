import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    user: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userService: UserService
    ) {
        this.user = {};

        this.userService.getUser()
            .then(user => {
                this.user = user;
            });
    }

    ionViewDidLoad() { }

}
