
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
    private router:Router
              ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
    console.log('adminguard')
    if(this.usuarioService.role === 'ADMIN_ROLE'){
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
    //return (this.usuarioService.role === 'ADMIN_ROLE') ? true : false;
  }



}

