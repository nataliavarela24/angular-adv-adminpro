import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuario!: Usuario;

  constructor(private sidebarService: SidebarService,
              public usuarioService: UsuarioService
  ){
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems);
  }

 ngOnInit(): void {
  setTimeout(() => {
    this.usuario = this.usuarioService.usuario;
  }, 0);
}
}
