import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

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
  get uid():string {
    return this.usuario.uid || '';
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
        const { email, google, img = '' , nombre, role, uid } = resp.usuario;

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
    `${base_url}/usuarios/${this.uid}`,
    data,
    {
      headers: {
        'x-token': this.token
      }
    }
  ).pipe(
    catchError(err => {
      return throwError(() => err);
    })
  );
}

  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          console.log("google resp: ",resp)
          localStorage.setItem('token', resp.token)
        })
      )
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          console.log("google resp: ",resp)
          localStorage.setItem('token', resp.token)
        })
      )

  }
}
