import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent  implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService
  ) {
    this.usuario= usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email, [Validators.required, Validators.email]],
    })

  }

  actualizarPerfil(){
    this.usuarioService.actualizarPefil(this.perfilForm.value)
         .subscribe( () => {
          //actualizando
          const {nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado','Cambios fueron guardados', 'success');
          
         }, err => {

      const mensaje =
        err?.error?.msg ||
        err?.message ||
        'Error al actualizar el perfil';

      Swal.fire('Error', mensaje, 'error');
    });
  }

  cambiarImagen( file: File ){

   this.imagenSubir= file;

   if(!file) {
    this.imgTemp = null
    return;
  }

   const reader = new FileReader();
   reader.readAsDataURL( file );

   reader.onloadend = () =>{
    this.imgTemp = reader.result;
  
   }

  }

  subirImagen(){
    
    this.fileUploadService
    .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid|| '')
    .then( img => {

      this.usuario.img = img
      Swal.fire('Guardado','Imagen de usuario actualizada', 'success');
    }).catch(err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen ', 'error');
    })
  }

}
