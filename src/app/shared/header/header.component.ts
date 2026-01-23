import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { BusquedasService } from '../../services/busquedas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  public imgUrl: string = '';
    public usuario!: Usuario;

  constructor(public usuarioService: UsuarioService,
               private router:Router
  ) { }

  ngOnInit(): void {
  setTimeout(() => {
    this.usuario = this.usuarioService.usuario;
  }, 0);
}


  logout() {
    this.usuarioService.logout();
  }

  buscar( termino:string){
    
    if ( termino.length === 0){
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`)
    return;
  }
}
