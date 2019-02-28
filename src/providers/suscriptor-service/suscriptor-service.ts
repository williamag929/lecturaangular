import { Injectable } from '@angular/core';
import { Http,Request } from '@angular/http';
import { RequestOptions, Headers, Response } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Observable } from "rxjs/Observable";

import { DbProvider } from './../../providers/db/db';

/*
  Generated class for the SuscriptorServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SuscriptorServiceProvider {

  suscriptores: any;
  error :string =  "";

  suscriptoritem = {};

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


  static get parameters() {
    return [[Http]];
  }

  iconfig: string;

  constructor(public http: Http, private db: DbProvider) {
    console.log('Hello SuscriptorServiceProvider Provider');
  }

    //private baseApiUrl = 'http://18.221.179.176:3129/api/'

    data: any;
    private headers: Headers;
  
    GetSuscriptores() {
      var url = 'http://18.221.179.176:3129/api/suscriptor';
      var response = this.http.get(url).map(res => res.json());
      return response;
    }

    
     // var url = 'http://18.221.179.176:3129/api/' + 'suscriptor/';
     // this.http.get(url).map((res: Response) => res.json())
     // .subscribe( res => this.suscriptores = res, error => this.error = error);

     // this.suscriptores.array.forEach(element => {
     //   console.log("suscriptor",element);
     //   this.suscriptor = element;

     //   this.db.addSuscriptor(this.suscriptor).then((res) => {
     //     console.log('adicionado');
     //   }, (err) => { console.log('error al insertar en la bd' + err) })

     // });

      //return this.suscriptores;
    //}

  
  





  }


