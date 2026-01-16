import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospitales() {

    const url = `${base_url}/hospitales`;

    return this.http.get<{ ok: boolean; hospitales: Hospital[] }>(
      url,
      this.headers
    ).pipe(
      map(resp => resp.hospitales)
    );

  }

  crearHospital(nombre: string) {

    const url = `${base_url}/hospitales`;

    return this.http.post( url,{ nombre }, this.headers);

  }

   actualizarHospital( id: string, nombre: string ) {

    const url = `${base_url}/hospitales/${ id }`;
    console.log("url...",url)

    return this.http.put( url,{ nombre }, this.headers);

  }
  borrarHospital( uid: string) {

    const url = `${base_url}/hospitales/${ uid }`;

    return this.http.delete( url, this.headers);

  }

}
