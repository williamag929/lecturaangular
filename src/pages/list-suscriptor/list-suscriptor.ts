import { LecturasPage } from './../lecturas/lecturas';
import { SuscriptorPage } from './../suscriptor/suscriptor';
import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListSuscriptorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-list-suscriptor',
  templateUrl: 'list-suscriptor.html',
})
export class ListSuscriptorPage {

  suscriptores: any;
  suscriptoresRef: any;
  actionsheetCtrl: any;
  platform: any;
  pedido: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListSuscriptorPage');
  }

  ionViewDidEnter() {
    //alert('ingreso');
    
    this.db.getSuscriptores().then((res) => {
      this.suscriptores = [];
      for (var i = 0; i < res.rows.length; i++) {
        this.suscriptores.push({
          suscriptorid: res.rows.item(i).suscriptorid,
          codigo: res.rows.item(i).codigo,
          descripcion: res.rows.item(i).descripcion,
          direccion: res.rows.item(i).direccion,
          estado: res.rows.item(i).estado,
          lat: res.rows.item(i).lat,
          lng: res.rows.item(i).lng,
          medidor: res.rows.item(i).medidor
        });
      };
      this.suscriptoresRef= this.suscriptores;
    }, (err) => {alert('error al sacar de la bd'+err)  })
  }

  addSuscriptor() {
    this.navCtrl.push(SuscriptorPage);
  }

  lecturaPush(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(LecturasPage, {
      suscriptorid: item.suscriptorid
    });
  }

  updateSuscriptor(event, item) {
    // That's right, we're pushing to ourselves!
    console.log(item);
    //alert(item.suscriptorid);
    this.navCtrl.push(SuscriptorPage, {
      item: item
    });
  }

  syncsuscriptor()
  {
    //this.sust.GetSuscriptores();
  }

  
  //busqueda inteligente usando espacios
  getItems(ev: any) {

    let val = ev.target.value;
    //lee el objeto y lo convierte a un array
    let fObj = val.split(" ");

    this.suscriptores = this.suscriptoresRef;

    //reinicia la busqueda
    //this.suscriptores = this.suscriptoresRef;

    //por cada elemento realiza la busqueda
    fObj.forEach(element => {
      //acumula la busqueda
      this.suscriptores = this.suscriptores.filter(function (item) {
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



  //menu emergente
  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Opciones',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Adicionar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'new' : null,
          handler: () => {
            this.addSuscriptor();
            console.log('Adicionar');
          }
        },
        {
          text: 'Sincronizar',
          icon: !this.platform.is('ios') ? 'refresh' : null,
          handler: () => {
            this.syncsuscriptor();
            console.log('Sync clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }




}
