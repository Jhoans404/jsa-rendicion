import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-papeleta-comision',
  imports: [FormsModule],
  templateUrl: './papeleta-comision.html',
  styleUrl: './papeleta-comision.css',
})
export class PapeletaComision {
  model = {
    dni: '',
    especialidad: '',
    nombres: '',
    lugar: '',
    fechaInicio: '',
    fechaFin: ''
  };

  submitted = false;
  guardando = false;
  mensaje = '';

  private readonly baseUrl = 'http://localhost:3000/comisiones';

  constructor(private http: HttpClient) {}

  enviar() {
    this.submitted = true;
    this.mensaje = '';
    if (!this.model.dni || !this.model.nombres || !this.model.fechaInicio) {
      return;
    }
    this.guardando = true;
    this.http.post(this.baseUrl, this.model).subscribe({
      next: () => {
        this.mensaje = 'Papeleta guardada.';
        this.guardando = false;
        this.limpiar();
      },
      error: () => {
        this.mensaje = 'No se pudo guardar la papeleta.';
        this.guardando = false;
      }
    });
  }

  limpiar() {
    this.model = {
      dni: '',
      especialidad: '',
      nombres: '',
      lugar: '',
      fechaInicio: '',
      fechaFin: ''
    };
    this.submitted = false;
  }
}
