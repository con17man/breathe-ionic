import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilsService {

    constructor(
        private toastCtrl: ToastController,
    ) {}


    showSimpleToast(message: string, duration?: number) {

        duration = (!duration) ? 1500 : duration;

        this.toastCtrl.create({
            message: message,
            duration: duration,
            // showCloseButton: true
        }).present();

    }



    showAlertToast(message: string) {

        this.toastCtrl.create({
            message: message,
            cssClass: 'alert-toast',
            showCloseButton: true,
            dismissOnPageChange: true
        }).present();

    }

}
