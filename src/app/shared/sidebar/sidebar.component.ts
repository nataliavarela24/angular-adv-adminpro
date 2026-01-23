import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { MenuItem } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {


  public usuario!: Usuario;

  constructor(public sidebarService: SidebarService,
              public usuarioService: UsuarioService
  ){
    this.usuario = this.usuarioService.usuario;

  }

 ngOnInit(): void {
   this.sidebarService.cargarMenu();
 
}
}
