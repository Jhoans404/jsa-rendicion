import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Viatico {
  id?: number;
  dni: string;
  especialidad: string;
  nombres: string;
  motivo: string;
  dias: number;
  montoDia: number;
  importe: number;
  firma: boolean;
  huella: boolean;
  firmaArchivo?: string;
  huellaArchivo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViaticoService {
  private readonly baseUrl = 'https://jsa-rendicion.onrender.com/viaticos';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Viatico[]> {
    return this.http.get<Viatico[]>(this.baseUrl);
  }

  guardar(data: Viatico): Observable<Viatico> {
    return this.http.post<Viatico>(this.baseUrl, data);
  }

  actualizar(id: number, data: Viatico): Observable<Viatico> {
    return this.http.put<Viatico>(`${this.baseUrl}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
