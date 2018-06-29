import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Injectable()
export class PushNotificationsService {

    constructor(
        private push: Push,
    ) { }


    checkForPermisions() {
        this.push.hasPermission()
            .then((res: any) => {
                if (res.isEnabled) {
                    console.log('Push notifications are enabled');
                } else {
                    console.log('Push notifications are disabled');
                }
            })
    }


    testPush() {
        const options: PushOptions = {
            android: {},
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

        pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }

}
