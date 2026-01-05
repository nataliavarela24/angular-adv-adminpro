import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit,OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs!: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {

  }

  ngOnDestroy(): void {
      this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs= this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe(img =>{
      this.cargarUsuarios()
  });
  }

  cargarUsuarios() {
    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;

        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;

      })
  }

  cambiarPagina(valor: number) {

    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

  buscar(termino: string) {

    if (termino.length === 0) {

      this.usuarios = this.usuariosTemp;
      return;
    }



    this.busquedasService.buscar('usuarios', termino)
      .subscribe(resultados => {
        this.usuarios = resultados;
      });

  }

  eliminarUsuario(usuario: Usuario) {

    if( usuario.uid === this.usuarioService.uid ) {
      Swal.fire('Error', 'No se puede borrarse a si mismo', 'error')
      return;
    }
    Swal.fire({
      title: "¿Borrar usuario'",
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "si, borrarlo"
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario( usuario )
        .subscribe( resp => {
          this.cargarUsuarios();
          Swal.fire(
            'Usuario borrado', 
            `${usuario.nombre} fue eliminado correctamente`,
            'success'
        );
      });
      }
    })

  }

  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario( usuario )
    .subscribe( resp => {
      console.log(resp);
    })

  }

  abrirModal(usuario: Usuario): void {
  this.modalImagenService.abrirModal(
    'usuarios',
    usuario.uid!,
    usuario.img || 'no-image'
  );
}


}

