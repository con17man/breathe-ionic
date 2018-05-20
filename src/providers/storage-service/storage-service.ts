import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

    constructor(
        private storage: Storage
    ) { }


    public set(key, value) {
        return new Promise((resolve, reject) => {
            this.storage.ready()
            .then(() => {
                this.storage.set(key, value);
                resolve();
            })
            .catch(err => {
                console.warn(err);
                reject();
            });
        });
    }



    public get(key) {
        return new Promise((resolve, reject) => {
            this.storage.ready()
            .then(() => {
                this.storage.get(key)
                .then(data => {
                    resolve(data);
                })
            })
            .catch(err => {
                console.warn(err);
                reject();
            });
        });
    }



    public remove(key) {
        return new Promise((resolve, reject) => {
            this.storage.ready()
            .then(() => {
                this.storage.remove(key);
                resolve();
            })
            .catch(err => {
                console.warn(err);
                reject();
            });
        });
    }



    public clear() {
        return new Promise((resolve, reject) => {
            this.storage.ready()
            .then(() => {
                this.storage.clear();
                resolve();
            })
            .catch(err => {
                console.warn(err);
                reject();
            });
        });
    }

}
