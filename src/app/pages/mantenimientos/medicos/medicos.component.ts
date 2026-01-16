import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators'
import { Subscription } from 'rxjs';

import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.css'
})
export class MedicosComponent implements OnInit,OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;


  constructor(private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService

  ) { }

    ngOnDestroy(): void {
      this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => {
        this.cargarMedicos()
      });
  }

  //obtener medicos
  cargarMedicos() {

    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medico => {
        this.cargando = false;
        this.medicos = medico;
      })

  }

  eliminarMedico(medico: Medico) {

        Swal.fire({
          title: "¿Borrar usuario'",
          text: `Esta a punto de borrar a ${medico.nombre}`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "si, borrarlo"
        }).then((result) => {
          if (result.value) {
            this.medicoService.borrarMedico( medico.id )
            .subscribe( resp => {
              this.cargarMedicos();
              Swal.fire(
                'Medico borrado', 
                `${medico.nombre} fue eliminado correctamente`,
                'success'
            );
          });
          }
        })
    }

  abrirModal(medico: Medico) {

    this.modalImagenService.abrirModal(
      'medicos',
      medico.id!,
      medico.img || 'no-image'
    );
  }

  buscar(termino: string) {

    if (termino.length === 0) {

      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos', termino)
      .subscribe(( resp) => {

        this.medicos = resp;
      });

  }


}
