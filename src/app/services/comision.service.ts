import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comision {
  id?: string;
  dni: string;
  especialidad: string;
  nombres: string;
  lugar: string;
  fechaInicio: string;
  fechaFin: string;
}

import { API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class ComisionService {
  private readonly baseUrl = `${API_CONFIG.baseUrl}/comisiones`;

  constructor(private http: HttpClient) {}

  obtener(): Observable<Comision[]> {
    return this.http.get<Comision[]>(this.baseUrl);
  }

  guardar(data: Comision): Observable<Comision> {
    return this.http.post<Comision>(this.baseUrl, data);
  }

  actualizar(id: string, data: Comision): Observable<Comision> {
    return this.http.put<Comision>(`${this.baseUrl}/${id}`, data);
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
