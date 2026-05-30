import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Colaborador {
  id?: number;
  dni: string;
  especialidad: string;
  nombres: string;
}

import { API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  private readonly baseUrl = `${API_CONFIG.baseUrl}/colaboradores`;

  constructor(private http: HttpClient) {}

  obtener(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.baseUrl);
  }

  guardar(data: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(this.baseUrl, data);
  }

  actualizar(id: number, data: Colaborador): Observable<Colaborador> {
    return this.http.put<Colaborador>(`${this.baseUrl}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
