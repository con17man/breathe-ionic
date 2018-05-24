import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { API } from '../../constants/endpoints';
import { Chart } from 'chart.js';

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



    public getSensorTypeMeasurements(type): Observable<any> {

        return Observable.create(observer => {
            this.http.get(API.sensor_type + type)
                .subscribe((response: any[]) => {

                    // console.log('>>>>', response);

                    let obj = {
                        dates: [],
                        records: [],
                        lastRecord: response.slice(-1).pop()
                    };

                    response.forEach(entry => {
                        obj.dates.push(entry.date);
                        obj.records.push(entry[type]);
                    });

                    observer.next(obj);
                    observer.complete();
                }, error => {
                    observer.error(error);
                });
        });
    }



    public renderSensorChart(sensorData, sensorType, chartElement) {
        let sensorChart = new Chart(chartElement, {
            type: 'line',
            data: {
                labels: sensorData.dates,
                datasets: [
                    {
                        label: sensorType,
                        data: sensorData.records,
                        backgroundColor: "rgba(239, 71, 111, 0.3)",
                        borderColor: '#EF476F',
                        pointBorderColor: '#EF476F',
                        pointHoverBackgroundColor: '#EF476F'
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        time: {
                            tooltipFormat: 'HH:mm'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepValue: 2,
                        }
                    }]
                }
            }
        })
    }

}
