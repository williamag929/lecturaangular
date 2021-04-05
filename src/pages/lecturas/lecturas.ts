import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  lecturaitem = {};

  lectura: { lecturaid : number;
    codigo: string;
    suscriptorid: string;
    fecha : string;
    lectura: number;
    observacion : string;
    lat : number;
    lng : number;
  }={
    lecturaid: 0,
    codigo: "",
    suscriptorid: "",
    fecha: new Date().toISOString().slice(0, 16),
    lectura: 0,
    observacion: "",
    lat: 0,
    lng: 0
  };

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DbProvider) {

    this.lecturaitem = this.navParams.get('item');

    console.log(this.lecturaitem);

    if (this.lecturaitem)
    {
      this.lectura = this.navParams.get('item');
    }
    else
    {

    this.lectura.suscriptorid = navParams.get("suscriptorid");
    //this.lectura.codigo = navParams.get("codigo");
    this.lectura.fecha = new Date().toISOString().slice(0, 16);
    }

    db.getSuscriptor(this.lectura.suscriptorid).then((res) => {
      //alert('lectura');
      for (let i = 0; i < res.rows.length; i++) {
        this.suscriptor = ({
          suscriptorid: res.rows.item(i).suscriptorid,
          codigo: res.rows.item(i).codigo,
          descripcion: res.rows.item(i).descripcion,
          direccion: res.rows.item(i).direccion,
          estado: res.rows.item(i).estado,
          lat: res.rows.item(i).lat,
          lng: res.rows.item(i).lng,
          medidor: res.rows.item(i).medidor
        });
      }
      this.lectura.codigo = this.suscriptor.codigo;
    }, (err) => { alert('error al sacar de la bd' + err) })




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LecturasPage');
  }

  ionViewDidEnter() {

    //try {
    //  this.lectura = this.navParams.get('item');
    //}
    //catch{ }



  }

  AddLectura() {

    if (this.lectura.lecturaid > 0) {
      this.db.updateLectura(this.lectura).then((res) => {
//        alert('actualizado');
        this.navCtrl.pop();
      }, (err) => { alert('error al actualizar' + err) })
    }
    else {
      this.db.addLectura(this.lectura).then((res) => {
//        alert('adicionado');
        this.navCtrl.pop();
      }, (err) => { alert('error al meter en la bd' + err) })
    }

  }

}
