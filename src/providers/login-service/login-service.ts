import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { API } from '../../constants/endpoints';

@Injectable()
export class AuthService {

    constructor(
        public http: HttpClient
    ) { }


    public loginUser(user): Observable<any> {

        return Observable.create(observer => {
            this.http.post(API.login, user)
                .subscribe(response => {
                    observer.next(response);
                    observer.complete();
                }, error => {
                    observer.error(error);
                })
        })

    }



    public registerUser(user): Observable<any> {

        return Observable.create(observer => {
            this.http.post(API.register, user)
                .subscribe(response => {
                    observer.next(response);
                    observer.complete();
                }, error => {
                    observer.error(error);
                })
        })
    }

}
