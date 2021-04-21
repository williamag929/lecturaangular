import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { SuscriptorServiceProvider } from '../../providers/suscriptor-service/suscriptor-service';
import { File } from '@ionic-native/file';
import { JsonPipe } from '@angular/common';





/**
 * Generated class for the SyncroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-syncro',
  templateUrl: 'syncro.html',
  providers: [SuscriptorServiceProvider]
})
export class SyncroPage {

  private promise: Promise<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private suscserv: SuscriptorServiceProvider,
    private db: DbProvider, public file: File) {
  }
  csvData: any[] = [];
  headerRow: any[] = [];

  suscriptores: any[] = [];

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



  ionViewDidLoad() {
    console.log('ionViewDidLoad SyncroPage');
  }



  async readFile() {

    let directory = this.file.externalRootDirectory + '/Download/';
    let filename = 'suscriptores.txt'

    this.promise = this.file.readAsText(directory, filename);
    await this.promise.then(value => {
      console.log(value);

      this.extractData(value);

    });
  }


  readSusc() {
    this.readFile();
  }


  extractData(data) {

    let lines = [];
    let allTextLines = data.split(/\r|\n|\r/);

    let firstrow = 'codigo;medidor;descripcion;direccion;estado;'

    let headers = firstrow.split(';');

    for (let i = 0; i < allTextLines.length; i++) {
      // split content based on comma
      let data = allTextLines[i].split(';');
      if (data.length === headers.length) {
        let tarr = [];
        for (let j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }

        // log each row to see output 
        console.log(tarr);
        lines.push(tarr);
      }
    }
    // all rows in the csv file 
    console.log(">>>>>>>>>>>>>>>>>", lines);


    lines.map((r) => {
      this.suscriptores.push({
        codigo: r[0],
        medidor: r[1],
        descripcion: r[2],
        direccion: r[3],
        estado: r[4]

      });
      //row.item[0]
    });
    console.log(">>>>>>>>>>>>>>>>>", this.suscriptores);

    alert('Archivo txt cargado');
    //throw new Error('Method not implemented.');
  }


  borrarSusc() {
    this.db.deleteSuscriptores();
    alert('Registros borrados');

  }


  borrarLecturas() {
    this.db.deleteLecturas();
    alert('Registros borrados');
  }


  guardarSusc()
  {
    this.addSuscriptores().then(res => {
      alert('Registros insertados');
    });

  }

  async addSuscriptores() {


    //this.db.deleteSuscriptores().then(res => {
    //  alert("Registros Borrados");
    this.suscriptores.map(element => {
      ///       console.log("suscriptor",element);
      //this.suscriptor = element;
      this.db.addSuscriptor(element).then((res) => {
        //console.log('adicionado');
      }, (err) => { console.log('error al insertar en la bd' + err) })
    });

    return true;

  }


  saveAsJson() {


    this.db.getLecturas().then((res) => {
      console.log("lectura recibida:" + res.rows.length);
      this.lecturas = [];
      for (let i = 0; i < res.rows.length; i++) {
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
      this.writeJsonLecturas();
    }, (err) => { alert('error al sacar de la bd' + err) })





  }


  writeJsonLecturas() {
    let fileName: any = "lectura.json"
    let json: any = this.lecturas;

    this.file.createFile(this.file.dataDirectory, fileName, true);

    this.file.writeFile(this.file.dataDirectory, fileName, json, { replace: true, append: false });
  }


  saveAsCsv() {


    this.db.getLecturas().then((res) => {
      console.log("lectura recibida:" + res.rows.length);
      this.lecturacsv = [];
      for (let i = 0; i < res.rows.length; i++) {
        console.log(res.rows.item(i));
        //alert(res.rows.item(i));
        this.lecturacsv.push({
          lecturaid: res.rows.item(i).lecturaid,
          codigo: res.rows.item(i).codigo,
          valor: res.rows.item(i).lectura
        });
      }
      this.writeCSVLecturas();

      alert('Archivo creado');

    }, (err) => { alert('error al sacar de la bd' + err) })


  }

  writeCSVLecturas() {
    let csv: any = this.ConvertToCSV(this.lecturacsv)
    let fileName: any = "lectura.txt"
    // this.file.writeFile(this.file.externalRootDirectory + '/Download/', fileName, csv)

    //this.file.writeFile(this.file.externalRootDirectory + '/Download/', fileName, csv, { replace: true });

    this.file.createFile(this.file.externalRootDirectory + '/Download/', fileName, true);

    this.file.writeFile(this.file.externalRootDirectory + '/Download/', fileName, csv, { replace: true, append: false });


  }





  ConvertToCSV(objArray) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = "";
    for (let index in objArray[0]) {
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
