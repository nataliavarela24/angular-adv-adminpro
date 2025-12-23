import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  public imgUrl: string = '';
    public usuario!: Usuario;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
  setTimeout(() => {
    this.usuario = this.usuarioService.usuario;
  }, 0);
}


  logout() {
    this.usuarioService.logout();
  }
}
