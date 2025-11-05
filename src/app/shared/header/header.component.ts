import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
 
  constructor( private usuarioService: UsuarioService ){

  }

  ngOnInit():void{
    
  }

  logout(){
    this.usuarioService.logout();
  }
}
