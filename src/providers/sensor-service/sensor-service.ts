import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { API } from '../../constants/endpoints';

@Injectable()
export class SensorService {

    constructor(
        public http: HttpClient
    ) { }

    public getLastMeasurements(): Observable<any> {

        return Observable.create(observer => {
            this.http.get(API.sensor_last)
                .subscribe(response => {
                    observer.next(response);
                    observer.complete();
                }, error => {
                    observer.error(error);
                });
        });
    }

}
