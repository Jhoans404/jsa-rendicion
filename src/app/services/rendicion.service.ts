import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Boleta {
  numero: string;
  monto: number;
  fecha: string;
  razon: string;
}

export interface Rendicion {
  id?: number;
  siaf: string;
  dependencia: string;
  dni: string;
  especialidad: string;
  nombres: string;
  motivo: string;
  lugar: string;
  clasificador: string;
  fecha: string;
  boletas: Boleta[];
}

@Injectable({
  providedIn: 'root'
})
export class RendicionService {
  private readonly baseUrl = 'http://localhost:3000/rendiciones';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Rendicion[]> {
    return this.http.get<Rendicion[]>(this.baseUrl);
  }

  guardar(data: Rendicion): Observable<Rendicion> {
    return this.http.post<Rendicion>(this.baseUrl, data);
  }

  actualizar(id: number, data: Rendicion): Observable<Rendicion> {
    return this.http.put<Rendicion>(`${this.baseUrl}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
