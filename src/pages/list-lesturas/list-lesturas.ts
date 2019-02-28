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
  lecturasRef : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DbProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListLesturasPage');
  }

  //lecturaid, suscriptorid, codigo,fecha ,lectura ,observacion, lat , lng 
  ionViewDidEnter() {
    console.log("open lecturas");
    this.db.getLecturas().then((res) => {
      console.log("lectura recibida:"+res.rows.length);
      this.lecturas = [];
      for (var i = 0; i < res.rows.length; i++) {
        console.log(res.rows.item(i));
        //alert(res.rows.item(i));
        this.lecturas.push({
          lecturaid: res.rows.item(i).lecturaid,
          suscriptorid:  res.rows.item(i).suscriptorid, 
          codigo: res.rows.item(i).codigo,
          fecha: res.rows.item(i).fecha,
          lectura: res.rows.item(i).lectura 
        });
      }
      this.lecturasRef = this.lecturas;
    }, (err) => {  alert('error al sacar de la bd'+err)  })
   
  }

  addLectura() {
    this.navCtrl.push(LecturasPage);
  }

  updateLectura(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(LecturasPage, {
      item: item
    });
  }


  //deleteLectura

  deleteLectura(event, item) {
    // That's right, we're pushing to ourselves!
    this.db.deleteLectura(item).then((res) => {

      
      let index: number = this.lecturas.indexOf(item); // <-- todo?
      if(index > -1){
          this.lecturas.splice(index, 1);
      }
      
      //alert('Registro Borrado');
    }, (err) => { alert('error al actualizar' + err) })
  }
   
  //busqueda inteligente usando espacios
  getItems(ev: any) {

    let val = ev.target.value;
    //lee el objeto y lo convierte a un array
    let fObj = val.split(" ");

    this.lecturas = this.lecturasRef;

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
