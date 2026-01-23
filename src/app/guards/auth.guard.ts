import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {

  }
  canLoad(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
     return this.usuarioService.validarToken()
           .pipe(
            tap( estaAutenticado => {

              if(!estaAutenticado){
                this.router.navigateByUrl('/login');
              }

            })
           );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
    
    return this.usuarioService.validarToken()
           .pipe(
            tap( estaAutenticado => {

              if(!estaAutenticado){
                this.router.navigateByUrl('/login');
              }

            })
           );
  }



}


