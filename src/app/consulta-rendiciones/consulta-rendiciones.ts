import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RendicionService, Rendicion } from '../services/rendicion.service';

@Component({
  selector: 'app-consulta-rendiciones',
  imports: [FormsModule, DatePipe, TitleCasePipe],
  templateUrl: './consulta-rendiciones.html',
  styleUrl: './consulta-rendiciones.css',
})
export class ConsultaRendiciones {
  filtros = {
    dni: '',
    colaborador: '',
    dependencia: '',
    fecha: ''
  };

  rendiciones: Rendicion[] = [];
  cargando = false;
  mensaje = '';

  constructor(private rendicionService: RendicionService) {
    this.cargar();
  }

  get resultados() {
    return this.rendiciones
      .filter((item) =>
        this.filtros.dni ? item.dni.includes(this.filtros.dni) : true
      )
      .filter((item) =>
        this.filtros.colaborador
          ? item.nombres.toLowerCase().includes(this.filtros.colaborador.toLowerCase())
          : true
      )
      .filter((item) =>
        this.filtros.dependencia
          ? item.dependencia.toLowerCase().includes(this.filtros.dependencia.toLowerCase())
          : true
      )
      .filter((item) =>
        this.filtros.fecha ? item.fecha === this.filtros.fecha : true
      )
      .map((item) => ({ ...item, nombres: item.nombres.toUpperCase() }));
  }

  encontrarPorDni() {
    if (!this.filtros.dni) {
      return null;
    }
    return this.rendiciones.find((item) => item.dni === this.filtros.dni) || null;
  }

  cargar() {
    this.cargando = true;
    this.mensaje = '';
    this.rendicionService.obtener().subscribe({
      next: (data) => {
        this.rendiciones = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.mensaje = 'No se pudo cargar rendiciones.';
      }
    });
  }
}
