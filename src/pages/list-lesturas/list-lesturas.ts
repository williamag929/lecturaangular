import { LecturasPage } from './../lecturas/lecturas';
import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the ListLesturasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-lesturas',
  templateUrl: 'list-lesturas.html',
})
export class ListLesturasPage {

  lecturas : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListLesturasPage');
  }

  
  ionViewDidEnter() {
    this.db.getSuscriptores().then((res) => {
      this.lecturas = [];
      for (var i = 0; i < res.rows.length; i++) {
        this.lecturas.push({
          lecturaid: res.rows.item(i).lecturas,
          suscriptorid:  res.rows.item(i).suscriptorid, 
          codigo: res.rows.item(i).codigo,
          fecha: res.rows.item(i).fecha,
          lectura: res.rows.item(i).lectura,
          observacion: res.rows.item(i).observacion,
          lat: res.rows.item(i).lat,
          lng: res.rows.item(i).lng,
        });
      }
    }, (err) => { /* alert('error al sacar de la bd'+err) */ })
  }

  addLectura() {
    this.navCtrl.push(LecturasPage);
  }

  update(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(LecturasPage, {
      item: item
    });
  }

   
  //busqueda inteligente usando espacios
  getItems(ev: any) {

    let val = ev.target.value;
    //lee el objeto y lo convierte a un array
    let fObj = val.split(" ");

    //this.suscriptoresRef = this.suscriptores;

    //reinicia la busqueda
    //this.suscriptores = this.suscriptoresRef;

    //por cada elemento realiza la busqueda
    fObj.forEach(element => {
      //acumula la busqueda
      this.lecturas = this.lecturas.filter(function (item) {
        //por cada propieda del item busca
        for (let property in item) {
          //si la propieda es null continua
          if (item[property] === null) {
            continue;
          }
          //si la busqueda es acertada retorna true
          if (item[property].toString().toLowerCase().includes(element.toLowerCase())) {
            return true;
          }
        }
        //si no se cumple retorna falso
        return false;
      });
    });
  
  }


}
