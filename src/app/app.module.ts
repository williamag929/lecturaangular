import { SyncroPage } from './../pages/syncro/syncro';
import { ListLesturasPage } from './../pages/list-lesturas/list-lesturas';
import { SuscriptorPage } from './../pages/suscriptor/suscriptor';
import { ListSuscriptorPage } from './../pages/list-suscriptor/list-suscriptor';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file/ngx';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DbProvider } from '../providers/db/db';
import { SQLite } from '@ionic-native/sqlite';
import { LecturasPage } from '../pages/lecturas/lecturas';
import { SuscriptorServiceProvider } from '../providers/suscriptor-service/suscriptor-service';
import { ScannerPage } from '../pages/scanner/scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListSuscriptorPage,
    SuscriptorPage,
    ListLesturasPage,
    LecturasPage,
    ScannerPage,
    SyncroPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListSuscriptorPage,
    SuscriptorPage,
    ListLesturasPage,
    LecturasPage,
    ScannerPage,
    SyncroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbProvider,
    SQLite,
    SuscriptorServiceProvider,
    BarcodeScanner,
    File
  ]
})
export class AppModule {}
