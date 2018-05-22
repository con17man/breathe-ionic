import { Directive, HostListener } from '@angular/core';
import { ActionSheetController, NavController } from 'ionic-angular';

@Directive({
    selector: '[settings-options]', // Attribute selector
    host: {
        '(click)': 'openSettings()'
    }
})
export class SettingsOptionsDirective {

    constructor(
        public actionSheetCtrl: ActionSheetController,
        private navCtrl: NavController
    ) {}

    openSettings() {

        this.actionSheetCtrl.create({
            title: 'Settings',
            buttons: [
                {
                    text: 'My Profile',
                    icon: 'ios-contact',
                    handler: () => {
                        this.navCtrl.push('ProfilePage');
                    }
                },
                {
                    text: 'Log out',
                    role: 'cancel',
                    icon: 'ios-log-out',
                    cssClass: 'logout-btn',
                    handler: () => {}
                }
            ]
        }).present();

    }

}
