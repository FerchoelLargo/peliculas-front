import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { generoCreacionDTO, generoDTO } from './generos';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor(private http: HttpClient ) { }

  private apiURL:string =`${environment.apiURL}generos`;

  public obtenerTodos( pagina: number, itemsPorPagina:number ): Observable<any> {
    let params = new HttpParams();
    params.append("pagina",pagina.toString());
    params.append("ItemsPorPagina",itemsPorPagina.toString());
    return this.http.get<generoDTO[]>(this.apiURL,{observe:"response",params});
  }

  public obtenerPorId( id: number): Observable<generoDTO> {
    return this.http.get<generoDTO>(`${this.apiURL}/${id}`);
  }

  public crear(genero: generoCreacionDTO){
    return this.http.post(this.apiURL,genero);
  }

  public editar( id: number,genero: generoCreacionDTO){
    return this.http.put<generoDTO>(`${this.apiURL}/${id}`,genero);
  }

  public borrar( id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

}
