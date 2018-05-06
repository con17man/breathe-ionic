import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilsService {

    constructor(
        private toastCtrl: ToastController,
    ) {}


    showSimpleToast(message: string, duration?: number) {

        if (!duration) {
            duration = 5000;
        }

        let toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            showCloseButton: true
        });

        toast.present();
    }

}
