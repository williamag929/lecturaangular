import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import { HttpClient } from '@angular/common/http';

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


  iconfig: string;

  constructor(public http: HttpClient) {
    console.log('Hello SuscriptorServiceProvider Provider');
  }

    //private baseApiUrl = 'http://18.221.179.176:3129/api/'

    data: any;


    GetSuscriptores(url) {
      return this.http
        .get(url, {
          responseType: 'text'
        });
    }


     // let url = 'http://18.221.179.176:3129/api/' + 'suscriptor/';
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


