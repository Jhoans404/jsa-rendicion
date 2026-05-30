import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ViaticoService, Viatico } from '../services/viatico.service';

@Component({
  selector: 'app-planilla-viaticos',
  imports: [FormsModule, CurrencyPipe, UpperCasePipe],
  templateUrl: './planilla-viaticos.html',
  styleUrl: './planilla-viaticos.css',
})
export class PlanillaViaticos {
  model = {
    dni: '',
    especialidad: '',
    nombres: '',
    motivo: '',
    dias: 0,
    montoDia: 0,
    importe: 0,
    firma: false,
    huella: false,
    firmaArchivo: '',
    huellaArchivo: ''
  };

  especialidades = [
    'Recursos Humanos',
    'Logistica',
    'Contabilidad',
    'Tesoreria',
    'Sistemas',
    'Administracion',
    'Compras',
    'Mantenimiento',
    'Operaciones'
  ];

  motivos = [
    'Supervision operativa',
    'Capacitacion',
    'Reunion tecnica',
    'Visita de inspeccion',
    'Entrega de reportes',
    'Atencion de emergencia',
    'Implementacion de sistema',
    'Coordinacion interinstitucional'
  ];

  submitted = false;
  guardando = false;
  errorMensaje = '';
  guardadoMensaje = '';
  registros: Viatico[] = [];
  seleccion: Viatico | null = null;

  constructor(private viaticoService: ViaticoService) {
    this.cargar();
  }

  calcularImporte() {
    const dias = Number(this.model.dias) || 0;
    const monto = Number(this.model.montoDia) || 0;
    this.model.importe = dias * monto;
  }

  enviar() {
    this.submitted = true;
    this.errorMensaje = '';
    this.guardadoMensaje = '';

    if (!this.model.dni || !this.model.nombres || this.model.dias <= 0 || this.model.montoDia <= 0) {
      return;
    }

    const payload: Viatico = {
      dni: this.model.dni,
      especialidad: this.model.especialidad,
      nombres: this.model.nombres,
      motivo: this.model.motivo,
      dias: this.model.dias,
      montoDia: this.model.montoDia,
      importe: this.model.importe,
      firma: this.model.firma,
      huella: this.model.huella,
      firmaArchivo: this.model.firmaArchivo,
      huellaArchivo: this.model.huellaArchivo
    };

    this.guardando = true;
    if (this.seleccion?.id) {
      this.viaticoService.actualizar(this.seleccion.id, payload).subscribe({
        next: (resultado) => {
          this.guardadoMensaje = 'Registro actualizado.';
          this.guardando = false;
          this.seleccion = null;
          this.cargar();
          this.limpiarFormulario();
        },
        error: () => {
          this.guardando = false;
          this.errorMensaje = 'No se pudo actualizar el registro.';
        }
      });
    } else {
      this.viaticoService.guardar(payload).subscribe({
        next: (resultado) => {
          this.guardadoMensaje = 'Registro guardado.';
          this.guardando = false;
          this.cargar();
          this.limpiarFormulario();
        },
        error: () => {
          this.guardando = false;
          this.errorMensaje = 'No se pudo guardar el registro.';
        }
      });
    }
  }

  cargar() {
    this.viaticoService.obtener().subscribe({
      next: (data) => {
        this.registros = data;
      },
      error: () => {
        this.errorMensaje = 'No se pudo cargar los viaticos.';
      }
    });
  }

  seleccionar(registro: Viatico) {
    this.seleccion = registro;
    this.model = {
      dni: registro.dni,
      especialidad: registro.especialidad,
      nombres: registro.nombres,
      motivo: registro.motivo,
      dias: registro.dias,
      montoDia: registro.montoDia,
      importe: registro.importe,
      firma: registro.firma,
      huella: registro.huella,
      firmaArchivo: registro.firmaArchivo ?? '',
      huellaArchivo: registro.huellaArchivo ?? ''
    };
  }

  eliminar(registro: Viatico) {
    if (!registro.id) {
      return;
    }
    this.viaticoService.eliminar(registro.id).subscribe({
      next: () => {
        this.guardadoMensaje = 'Registro eliminado.';
        this.cargar();
      },
      error: () => {
        this.errorMensaje = 'No se pudo eliminar el registro.';
      }
    });
  }

  limpiarFormulario() {
    this.model = {
      dni: '',
      especialidad: '',
      nombres: '',
      motivo: '',
      dias: 0,
      montoDia: 0,
      importe: 0,
      firma: false,
      huella: false,
      firmaArchivo: '',
      huellaArchivo: ''
    };
    this.submitted = false;
  }

  manejarFirma(event: Event) {
    const input = event.target as HTMLInputElement;
    this.model.firmaArchivo = input.files?.[0]?.name ?? '';
  }

  manejarHuella(event: Event) {
    const input = event.target as HTMLInputElement;
    this.model.huellaArchivo = input.files?.[0]?.name ?? '';
  }
}
