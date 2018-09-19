import { LecturaItem } from './../../models/lectura-item/lectura-item-interface';
import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the LecturasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-lecturas',
  templateUrl: 'lecturas.html',
})
export class LecturasPage {

  lectura : LecturaItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DbProvider) {
    this.lectura.suscriptorid = navParams.get("suscriptorid");
    this.lectura.codigo = navParams.get("codigo");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LecturasPage');
  }

  
  AddLectura(){
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

    if(!this.lectura.lecturaid){

      console.log("adiciona");

      this.db.updateLectura(this.lectura).then((res)=>{
        this.navCtrl.pop;
       /*  alert('se ha introducido correctamente en la bd'); */
      },(err)=>{ /* alert('error al meter en la bd'+err) */ })

    }
    else
    {
      console.log("actualiza");
      
      this.db.addLectura(this.lectura).then((res)=>{
      this.navCtrl.pop;
     /*  alert('se ha introducido correctamente en la bd'); */
    },(err)=>{ /* alert('error al meter en la bd'+err) */ })
  }
}

}
