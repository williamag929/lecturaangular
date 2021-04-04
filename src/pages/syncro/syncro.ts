import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { SuscriptorServiceProvider } from '../../providers/suscriptor-service/suscriptor-service';
import { File } from '@ionic-native/file/ngx';





/**
 * Generated class for the SyncroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-syncro',
  templateUrl: 'syncro.html',
  providers:[SuscriptorServiceProvider]
})
export class SyncroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private suscserv: SuscriptorServiceProvider,
    private db: DbProvider, private file: File) {
  }
  csvData: any[] = [];
  headerRow: any[] = [];

  suscriptores: any;

  suscriptoritem = {};

  lecturas: any;

  lecturacsv: any;

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



  //fileTransfer: FileTransferObject = this.transfer.create();

  ionViewDidLoad() {
    console.log('ionViewDidLoad SyncroPage');
  }


  readfile() {
    this.suscserv.GetSuscriptores(this.file.externalRootDirectory + '/Download/suscriptores.txt').subscribe(
      data => this.extractData(data),
      err => {
        console.log('something went wrong: ',err);
      }
    );

    //let csv = this.papa.unparse({
    //  fields: this.headerRow,
    //  data: this.csvData
    //});

    this.csvData.forEach((row) => {
      this.suscriptores.push({
        codigo: row.item(0),
        medidor:  row.item(1),
        descripcion: row.item(2),
        direccion: row.item(3),
        estado: row.item(4)

      });

      row.item[0]

    });


  
  }
  extractData(data: any) {
    throw new Error('Method not implemented.');
  }


  BorrarSusc() {
    this.db.deleteSuscriptores().then(res => {
      alert("Registros Borrados");
    });
  }


  BorrarLecturas() {
    this.db.deleteLecturas().then(res => {
      alert("Registros Borrados");
    });
  }

  GuardarSusc() {


    this.db.deleteSuscriptores().then(res => {
      alert("Registros Borrados");


      this.suscriptores.forEach(element => {
        ///       console.log("suscriptor",element);
        //this.suscriptor = element;
        this.db.addSuscriptor(element).then((res) => {
          console.log('adicionado');
        }, (err) => { console.log('error al insertar en la bd' + err) })
      });

    });
  }


  saveAsJson() {


    this.db.getLecturas().then((res) => {
      console.log("lectura recibida:" + res.rows.length);
      this.lecturas = [];
      for (var i = 0; i < res.rows.length; i++) {
        console.log(res.rows.item(i));
        //alert(res.rows.item(i));
        this.lecturas.push({
          lecturaid: res.rows.item(i).lecturaid,
          suscriptorid: res.rows.item(i).suscriptorid,
          codigo: res.rows.item(i).codigo,
          fecha: res.rows.item(i).fecha,
          lectura: res.rows.item(i).lectura
        });
      }
      this.GetJsonLecturas();
    }, (err) => { alert('error al sacar de la bd' + err) })





  }


  GetJsonLecturas() {
    var fileName: any = "lectura.json"
    var json: any = this.lecturas;

     this.file.writeFile(this.file.externalRootDirectory + '/Download/', fileName, json, { replace: true })
      .then(_ => alert('Success ;-)'))
      .catch(err => alert('Failure'));
  }


  saveAsCsv() {


    this.db.getLecturas().then((res) => {
      console.log("lectura recibida:" + res.rows.length);
      this.lecturacsv = [];
      for (var i = 0; i < res.rows.length; i++) {
        console.log(res.rows.item(i));
        //alert(res.rows.item(i));
        this.lecturacsv.push({
          lecturaid: res.rows.item(i).lecturaid,
          suscriptorid: res.rows.item(i).codigo,
          valor: res.rows.item(i).lectura
        });
      }
      this.GetCSVLecturas();
    }, (err) => { alert('error al sacar de la bd' + err) })


  }

  GetCSVLecturas() {
    let csv: any = this.ConvertToCSV(this.lecturacsv)
    let fileName: any = "lectura.txt"
    // this.file.writeFile(this.file.externalRootDirectory + '/Download/', fileName, csv)

    this.file.writeFile(this.file.externalRootDirectory + '/Download/', fileName, csv, { replace: true })
    .then(
      _ => {
        alert('Success ;-)')
      }
    )
    .catch(
      err => {

        alert('Failure')


      }
    )    


  }





  ConvertToCSV(objArray) {
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      let row = "";
      for(let index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line != '') line += ',';
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }



}
