import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cineCreacionDTO, cineDTO } from './cine';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  private apiURL:string =`${environment.apiURL}cines`;

  constructor(private http: HttpClient) { }

  public crear(cine:cineCreacionDTO){
    return this.http.post(this.apiURL,cine);
  }

  public obtenerTodos( pagina: number, itemsPorPagina:number ): Observable<any> {
    let params = new HttpParams();
    params.append("pagina",pagina.toString());
    params.append("ItemsPorPagina",itemsPorPagina.toString());
    return this.http.get<cineDTO[]>(this.apiURL,{observe:"response",params});
  }
  
  public obtenerPorId( id:number ): Observable<cineCreacionDTO> {
    return this.http.get<cineCreacionDTO>(`${this.apiURL}/${id}`);
  }

  public borrar( id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  public editar( id: number,cine:cineCreacionDTO){
    return this.http.put(`${this.apiURL}/${id}`,cine);
  }
  
}
