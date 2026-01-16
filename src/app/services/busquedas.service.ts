import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
     user => new Usuario(user.nombre, user.email, '', user.role, user.google, user.img, user.uid)
    )
  }

     private transformarHospitales(resultados: any[]): Hospital[] {
    return resultados.map(
      hospital => new Hospital(
        hospital.nombre,
        hospital.id,
        hospital.img,
        hospital.usuario
      )
    );
  }

   private transformarMedicos(resultados: any[]): Medico[] {
    return resultados;
  }
buscar(tipo: 'usuarios', termino: string): Observable<Usuario[]>;
buscar(tipo: 'hospitales', termino: string): Observable<Hospital[]>;
buscar(tipo: 'medicos', termino: string): Observable<any[]>;

buscar(tipo: 'usuarios' | 'hospitales' | 'medicos', termino: string) {

  const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

  return this.http.get<any>(url, this.headers).pipe(
    map(resp => {
      switch (tipo) {
        case 'usuarios':
          return this.transformarUsuarios(resp.resultados);

        case 'hospitales':
          return this.transformarHospitales(resp.resultados);

        case 'medicos':
          return this.transformarMedicos(resp.resultados);

        default:
          return [];
      }
    })
  );
}

}
