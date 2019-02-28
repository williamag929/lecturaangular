import { SyncroPage } from './../pages/syncro/syncro';
import { ListLesturasPage } from './../pages/list-lesturas/list-lesturas';
import { ListSuscriptorPage } from './../pages/list-suscriptor/list-suscriptor';
import { ScannerPage } from './../pages/scanner/scanner';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DbProvider } from '../providers/db/db';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;


  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public db:DbProvider)  {

        // used for an example of ngFor and navigation
        this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'Suscriptores', component: ListSuscriptorPage },
          { title: 'Lecturas', component: ListLesturasPage },    
          { title: 'Scanner', component: ScannerPage },
          { title: 'Sincronizar', component: SyncroPage }     
        ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //this.db.openDb().then(() => this.db.createTableLecturas());

      this.db.openDb().then(() =>db.createTables());
    });



  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

