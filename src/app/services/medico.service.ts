import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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
  //get medicos
  cargarMedicos() {

    const url = `${base_url}/medicos`;

    return this.http.get<{ ok: boolean; medicos: Medico[] }>(
      url,
      this.headers
    ).pipe(
      map(resp => resp.medicos)
    );

  }

  obtenerMedicoPorId( id:string ) {

    const url = `${base_url}/medicos/${ id }`;

    return this.http.get<{ ok: boolean; medico: Medico }>(
      url,
      this.headers
    ).pipe(
      map(resp => resp.medico)
    );

  }

  crearMedico(medico:{nombre:string, hospital: string}) {

    const url = `${base_url}/medicos`;

    return this.http.post(url, medico , this.headers);

  }

  actualizarMedico(data: {id: string, nombre: string}) {

    const url = `${base_url}/medicos/${data.id}`;
    console.log("url...", url)

    return this.http.put(url, data , this.headers);

  }
  borrarMedico(uid: string) {

    const url = `${base_url}/medicos/${uid}`;

    return this.http.delete(url, this.headers);

  }
}
