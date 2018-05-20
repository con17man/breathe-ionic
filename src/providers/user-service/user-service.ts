import { Injectable } from '@angular/core';
import { StorageService } from '../storage-service/storage-service';

@Injectable()
export class UserService {

    constructor(
        private storageService: StorageService
    ) { }


    public setUser(user) {
        this.storageService.set('user', user);
    }

    public getUser() {
        return this.storageService.get('user');
    }

}
