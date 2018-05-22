import { Directive, HostListener } from '@angular/core';
import { ActionSheetController, NavController, App } from 'ionic-angular';

@Directive({
    selector: '[settings-options]', // Attribute selector
    host: {
        '(click)': 'openSettings()'
    }
})
export class SettingsOptionsDirective {

    constructor(
        public actionSheetCtrl: ActionSheetController,
        private navCtrl: NavController,
        private appCtrl: App
    ) {}

    openSettings() {

        this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Dashboard',
                    icon: 'ios-analytics-outline',
                    handler: () => {
                        this.navigateToPage('DashboardPage');
                    }
                },
                {
                    text: 'My Profile',
                    icon: 'ios-contact-outline',
                    handler: () => {
                        this.navigateToPage('ProfilePage');
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



    /**
     * @desc navigate to a given page
     * check if already on that page
     * if going to dashboardPage set it as rootPage (disable going)
     * @memberof SettingsOptionsDirective
     */
    navigateToPage(pageName: string) {
        let currentPageName = this.appCtrl.getActiveNav().getActive().name;

        if (currentPageName !== pageName) {

            if (pageName === 'DashboardPage') {
                this.appCtrl.getRootNav().setRoot('DashboardPage');
                return;
            }

            this.navCtrl.push(pageName);
        }
    }

}
