import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RendicionService, Rendicion } from '../services/rendicion.service';

@Component({
  selector: 'app-rendicion-cuentas',
  imports: [FormsModule, DatePipe, TitleCasePipe],
  templateUrl: './rendicion-cuentas.html',
  styleUrl: './rendicion-cuentas.css',
})
export class RendicionCuentas {
  model = {
    siaf: '',
    dependencia: '',
    dni: '',
    especialidad: '',
    nombres: '',
    motivo: '',
    lugar: '',
    clasificador: '',
    fecha: '',
    boletas: [
      { numero: '', monto: 0, fecha: '', razon: '' }
    ]
  };

  submitted = false;
  guardando = false;
  mensaje = '';
  registros: Rendicion[] = [];
  seleccion: Rendicion | null = null;

  constructor(private rendicionService: RendicionService) {
    this.cargar();
  }

  agregarBoleta() {
    this.model.boletas.push({ numero: '', monto: 0, fecha: '', razon: '' });
  }

  eliminarBoleta(index: number) {
    if (this.model.boletas.length > 1) {
      this.model.boletas.splice(index, 1);
    }
  }

  enviar() {
    this.submitted = true;
    this.mensaje = '';

    if (!this.model.siaf || !this.model.fecha || !this.model.dni) {
      return;
    }

    const payload: Rendicion = {
      siaf: this.model.siaf,
      dependencia: this.model.dependencia,
      dni: this.model.dni,
      especialidad: this.model.especialidad,
      nombres: this.model.nombres,
      motivo: this.model.motivo,
      lugar: this.model.lugar,
      clasificador: this.model.clasificador,
      fecha: this.model.fecha,
      boletas: this.model.boletas
    };

    this.guardando = true;
    if (this.seleccion?.id) {
      this.rendicionService.actualizar(this.seleccion.id, payload).subscribe({
        next: () => {
          this.mensaje = 'Rendicion actualizada.';
          this.guardando = false;
          this.seleccion = null;
          this.cargar();
          this.limpiar();
        },
        error: () => {
          this.guardando = false;
          this.mensaje = 'No se pudo actualizar la rendicion.';
        }
      });
    } else {
      this.rendicionService.guardar(payload).subscribe({
        next: () => {
          this.mensaje = 'Rendicion guardada.';
          this.guardando = false;
          this.cargar();
          this.limpiar();
        },
        error: () => {
          this.guardando = false;
          this.mensaje = 'No se pudo guardar la rendicion.';
        }
      });
    }
  }

  cargar() {
    this.rendicionService.obtener().subscribe({
      next: (data) => {
        this.registros = data;
      },
      error: () => {
        this.mensaje = 'No se pudo cargar rendiciones.';
      }
    });
  }

  seleccionar(registro: Rendicion) {
    this.seleccion = registro;
    this.model = {
      siaf: registro.siaf,
      dependencia: registro.dependencia,
      dni: registro.dni,
      especialidad: registro.especialidad,
      nombres: registro.nombres,
      motivo: registro.motivo,
      lugar: registro.lugar,
      clasificador: registro.clasificador,
      fecha: registro.fecha,
      boletas: registro.boletas.map((item) => ({ ...item }))
    };
  }

  eliminar(registro: Rendicion) {
    if (!registro.id) {
      return;
    }
    this.rendicionService.eliminar(registro.id).subscribe({
      next: () => {
        this.mensaje = 'Rendicion eliminada.';
        this.cargar();
      },
      error: () => {
        this.mensaje = 'No se pudo eliminar la rendicion.';
      }
    });
  }

  limpiar() {
    this.model = {
      siaf: '',
      dependencia: '',
      dni: '',
      especialidad: '',
      nombres: '',
      motivo: '',
      lugar: '',
      clasificador: '',
      fecha: '',
      boletas: [
        { numero: '', monto: 0, fecha: '', razon: '' }
      ]
    };
    this.submitted = false;
  }
}
