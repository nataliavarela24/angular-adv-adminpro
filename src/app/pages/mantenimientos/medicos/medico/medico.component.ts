import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

//servicios
import { HospitalService } from '../../../../services/hospital.service';
import { MedicoService } from '../../../../services/medico.service';

//models
import { Hospital } from '../../../../models/hospital.model';
import { Medico } from '../../../../models/medico.model';
import { Subscription } from 'rxjs';
import { ModalImagenService } from '../../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public imgSubs!: Subscription;

  public hospitalSeleccionado!: Hospital;
  public medicoSeleccionado!: Medico;

  constructor(private fb: FormBuilder,
    public hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    public medicoService: MedicoService,
    public router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.activateRoute.params
      .subscribe(({ id }) => this.cargarMedico(id));
      

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado =
          this.hospitales.find(h => h._id === hospitalId)!;
      });
  }


  cargarHospitales() {
    return this.hospitalService.cargarHospitales();
  }


  cargarMedico(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {

        this.hospitales = hospitales;

        this.medicoService.obtenerMedicoPorId(id)
          .subscribe(medico => {

            if (!medico || !medico.hospital) {
              this.router.navigateByUrl('/dashboard/medicos');
              return;
            }

            const { nombre, hospital: { _id } } = medico;

            this.medicoSeleccionado = medico;

            this.medicoForm.patchValue({
              nombre,
              hospital: _id
            });
            
            this.hospitalSeleccionado =
              this.hospitales.find(h => h._id === _id)!;
          });
      });
  }




  guardarMedico() {

    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      //actualizar
      const data = {
        id: this.medicoSeleccionado.id,
        nombre: nombre,
        hospital: this.medicoForm.value.hospital
      }
      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {

          Swal.fire('Actualizado', `${nombre} Actualizado correctamente`, `success`);

        })
    } else {
      //crear

      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire('Creado', `${nombre} creado correctamente`, `success`);
          this.router.navigateByUrl(`/dashboard/medicos/${resp.medico.id}`)
        })
    }
  }

}
