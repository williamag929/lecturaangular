import { ScannerPage } from './../scanner/scanner';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListLesturasPage } from '../../pages/list-lesturas/list-lesturas';
import { ListSuscriptorPage } from '../../pages/list-suscriptor/list-suscriptor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  Scannear(event, item) {
    // That's right, we're pushing to ourselves!
    console.log(item);
    //alert(item.suscriptorid);
    this.navCtrl.push(ScannerPage);
  }

  Suscriptores(event, item) {
    // That's right, we're pushing to ourselves!
    console.log(item);
    //alert(item.suscriptorid);
    this.navCtrl.push(ListSuscriptorPage);
  }

  Lecturas(event, item) {
    // That's right, we're pushing to ourselves!
    console.log(item);
    //alert(item.suscriptorid);
    this.navCtrl.push(ListLesturasPage);
  }

}
