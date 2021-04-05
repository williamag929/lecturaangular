import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { LecturasPage } from '../lecturas/lecturas';



/**
 * Generated class for the ScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  suscriptores: any;
  suscriptoresRef: any;
  selected: any;

  suscriptorsel: {
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


  suscriptorFound: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private db: DbProvider) {
  }

  ionViewDidLoad() {


    this.db.getSuscriptores().then((res) => {
      this.suscriptores = [];
      for (let i = 0; i < res.rows.length; i++) {
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
      this.suscriptoresRef = this.suscriptores;
    }, (err) => { alert('error al sacar de la bd' + err) })


  }

  scan() {

    this.suscriptorFound = false;

    this.barcodeScanner.scan().then((barcodeData) => {
      console.log('Barcode data', barcodeData.text);

      this.selected = this.suscriptores.find(suscriptor => suscriptor.medidor === barcodeData.text);

      if (this.selected !== undefined) {
        this.suscriptorFound = true;
        this.suscriptorsel = this.selected;
      } else {
        this.suscriptorFound = false;
      }

    }).catch(err => {
      console.log('Error', err);
    });


  }

  lectura(){
       if (this.suscriptorFound == true) {
      this.navCtrl.push(LecturasPage, {
        suscriptorid: this.suscriptorsel.suscriptorid
      });
    }
  }



}
