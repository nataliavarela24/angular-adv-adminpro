import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import Swal from 'sweetalert2';

declare const google: any;
declare const gapi: any;


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!: Usuario;

  constructor(private http: HttpClient,
    private router: Router
  ) {
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  logout() {
    localStorage.removeItem('token');

    // Revoca el token de Google si se usó login con Google
    google.accounts.id.disableAutoSelect();

    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        console.log("resp:", resp);
        const { email, google, img = '', nombre, role, uid } = resp.usuario;

        this.usuario = new Usuario(
          nombre,
          email,
          '',
          role,      // role en su posición correcta
          google,
          img,       // img en su posición correcta
          uid
        );

        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => {
        console.log("error", error);
        return of(false)
      })

    );
  }

  crearUsuario(formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }


  actualizarPefil(data: { email: string; nombre: string; role?: string }) {
    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,data, this.headers
    );
  }

  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          console.log("google resp: ", resp)
          localStorage.setItem('token', resp.token)
        })
      )
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          console.log("google resp: ", resp)
          localStorage.setItem('token', resp.token)
        })
      )

  }


  cargarUsuarios(desde: number = 0) {
    //http://localhost:3005/api/usuarios?desde=5

    const url = `${base_url}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(user => new Usuario(user.nombre, user.email, '', user.role, user.google, user.img, user.uid))
          console.log("uuu", usuarios)
          return {
            total: resp.total,
            usuarios
          }
        })
      )

  }
  eliminarUsuario(usuario: Usuario) {
    //usuarios/68546385e349de02cf13ed02
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);


  }
  guardarUsuario(usuario: Usuario) {

    return this.http.put(
      `${base_url}/usuarios/${ usuario.uid }`,usuario, this.headers
    );
  }
}
