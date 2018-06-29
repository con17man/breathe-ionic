import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { UtilsService } from '../providers/utils-service/utils-service';
import { UserService } from '../providers/user-service/user-service';
import { StorageService } from '../providers/storage-service/storage-service';
import { SensorService } from '../providers/sensor-service/sensor-service';
import { DirectivesModule } from '../directives/directives.module';
// import { Push } from '@ionic-native/push';
// import { PushNotificationsService } from '../providers/push-notifications-service/push-notifications-service';

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        DirectivesModule,
        IonicModule.forRoot(MyApp, {
            mode: 'ios',
            iconMode: 'ios'
        }),
        IonicStorageModule.forRoot({
            name: 'smartHome__DB',
               driverOrder: ['indexeddb', 'sqlite', 'websql']
          })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthService,
        UtilsService,
        UserService,
        StorageService,
        SensorService,
        // Push,
        // PushNotificationsService,
    ]
})
export class AppModule { }
