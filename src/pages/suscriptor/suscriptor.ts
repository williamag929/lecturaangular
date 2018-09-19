import { DbProvider } from './../../providers/db/db';
import { SuscriptorItem } from './../../models/suscriptor-item/suscriptor-item-iterface';
import { Component } from '@angular/core';
import {  NavController, NavParams} from 'ionic-angular';

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

  suscriptores : any;

  suscriptor : SuscriptorItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuscriptorPage');
  }

  AddSuscriptor(){
    /*
    let suscriptor = {
      codigo: this.suscriptor.codigo,
      descripcion : this.suscriptor.descripcion,
      direccion : this.suscriptor.direccion,
      estado: this.suscriptor.estado,
      lng: this.suscriptor.lng ,
      lat: this.suscriptor.lat,
      medidor: this.suscriptor.medidor,
    }*/

    if(!this.suscriptor.suscriptorid){

      console.log("adiciona");

      this.db.updateSuscriptor(this.suscriptor).then((res)=>{
        this.navCtrl.pop;
       /*  alert('se ha introducido correctamente en la bd'); */
      },(err)=>{ /* alert('error al meter en la bd'+err) */ })

    }
    else
    {
      console.log("actualiza");

      this.db.addSuscriptor(this.suscriptor).then((res)=>{
      this.navCtrl.pop;
     /*  alert('se ha introducido correctamente en la bd'); */
    },(err)=>{ /* alert('error al meter en la bd'+err) */ })
  }
}

}
