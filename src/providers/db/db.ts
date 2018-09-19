import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the Db provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DbProvider {

  db: SQLiteObject = null;
  constructor(public sqlite: SQLite) {
    console.log('Hello Db Provider');
  }

  public openDb() {
    return this.sqlite.create({
      name: 'dataLectura.db',
      location: 'default' // el campo location es obligatorio
    })
      .then((db: SQLiteObject) => {
        this.db = db;
      })

  }

  ///#region suscriptor

  public createTableSuscriptor() {
    return this.db.executeSql("create table if not exists suscriptores( suscriptorid INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT, descripcion TEXT,direccion TEXT,estado TEXT, lat FLOAT, lng FLOAT, medidor TEXT )")
  }
  public addSuscriptor(data) {
    let sql = "INSERT INTO suscriptores ( codigo , descripcion ,direccion ,estado , lat , lng , medidor  ) values (?,?,?,?,?,?,?)";
    return this.db.executeSql(sql, [data.codigo, data.descripcion, data.direccion, data.estado, data.lat, data.lng, data.medidor]);
  }

  public updateSuscriptor(data) {
    let sql = "UPDATE suscriptores SET codigo =?, descripcion=? ,direccion =?,estado=? , lat =?, lng =?, medidor =? where suscriptorid = ?)";
    return this.db.executeSql(sql, [data.codigo, data.descripcion, data.direccion, data.estado, data.lat, data.lng, data.medidor,data.suscriptorid]);
  }

  public deleteSuscriptor(data) {
    let sql = "DELETE suscriptores where suscriptorid = ?)";
    return this.db.executeSql(sql, [data.suscriptorid]);
  }
  
  public getSuscriptores() {
    let sql = "SELECT * FROM suscriptores";
    return this.db.executeSql(sql);
  }

  ///lecturas
/*
  lecturaid : number;
  suscriptorid: string;
  fecha : Date;
  lectura: number;
  observacion: string;
  latitud: string;
  longitud: string;
  */

  public createTableLecturas() {
    return this.db.executeSql("create table if not exists lecturas( lecturaid INTEGER PRIMARY KEY AUTOINCREMENT,suscriptorid INTEGER, codigo TEXT, fecha DATE, lectura INTEGER, observacion TEXT, lat FLOAT, lng FLOAT )")
  }
  public addLectura(data) {
    let sql = "INSERT INTO lecturas ( suscriptorid ,codigo,fecha ,lectura ,observacion, lat , lng   ) values (?,?,?,?,?,?,?)";
    return this.db.executeSql(sql, [ data.suscriptorid,data.codigo ,data.fecha ,data.lectura ,data.observacion, data.lat , data.lng ]);
  }

  public updateLectura(data) {
    let sql = "UPDATE lecturas SET suscriptorid =? ,codigo =?,fecha = ? ,lectura =? ,observacion = ?, lat = ?, lng =?  where lecturaid = ?)";
    return this.db.executeSql(sql, [ data.suscriptorid,data.codigo ,data.fecha ,data.lectura ,data.observacion, data.lat , data.lng, data.lecturaid ]);
  }

  public deleteLectura(data) {
    let sql = "DELETE lecturas where lecturaid = ?)";
    return this.db.executeSql(sql, [data.lecturaid]);
  }
  
  public getLecturas() {
    let sql = "SELECT * FROM lecturas";
    return this.db.executeSql(sql);
  }


}