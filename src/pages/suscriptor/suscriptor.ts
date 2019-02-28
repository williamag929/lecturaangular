import { DbProvider } from './../../providers/db/db';
import { SuscriptorItem } from './../../models/suscriptor-item/suscriptor-item-iterface';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SuscriptorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-suscriptor',
  templateUrl: 'suscriptor.html',
})
export class SuscriptorPage {

  suscriptores: any;

  suscriptoritem = {};

  suscriptor: {
    suscriptorid: number;
    codigo: string;
    descripcion: string;
    direccion: string;
    estado: string;
    lat: number;
    lng: number;
    medidor: string;
  } =
    { suscriptorid: 0, codigo: "", descripcion: "", direccion: "", estado: "", lng: 0, lat: 0, medidor: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DbProvider) {

    //this.suscriptor = {suscriptorid:0, codigo: "",descripcion:"",direccion:"",estado:"",lng:0,lat:0,medidor:""};

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuscriptorPage');
  }


  ionViewDidEnter() {

    this.suscriptoritem = this.navParams.get('item');

    console.log(this.suscriptoritem);

    if (this.suscriptoritem)
      this.suscriptor = this.navParams.get('item');

  }

  SaveSuscriptor() {

    if (this.suscriptor.suscriptorid > 0) {
      this.db.updateSuscriptor(this.suscriptor).then((res) => {
        this.navCtrl.pop();
      }, (err) => { alert('error al actualizar' + err) })

    }
    else {

      this.db.addSuscriptor(this.suscriptor).then((res) => {
        //alert('adicionado');
        this.navCtrl.pop();
      }, (err) => { alert('error al insertar en la bd' + err) })

    }
  }
}
