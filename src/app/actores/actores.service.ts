import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { actorCreacionDTO, actorEdicionDTO, ActorPeliculaDTO } from './actor';

@Injectable({
  providedIn: 'root'
})

export class ActoresService {

  private apiURL:string =`${environment.apiURL}actores`;

  constructor(private httpCliente: HttpClient) {}

  public crear(actor:actorCreacionDTO){
    const formData = this.construirFormData(actor);
    return this.httpCliente.post(this.apiURL,formData);
  }

  private construirFormData(actor: actorCreacionDTO): FormData{
    const formData = new FormData();
    formData.append('nombre',actor.nombre)
    if(actor['fechaNacimiento'])
      formData.append('fechaNacimiento',formatearFecha(actor.fechaNacimiento))
    if(actor['biografia'])
      formData.append('biografia',actor.biografia)
    if(actor['foto'])
      formData.append('foto',actor.foto)
    
    return formData;
  }

  public obtenerTodos( pagina: number, itemsPorPagina:number ): Observable<any> {
    let params = new HttpParams();
    params.append("pagina",pagina.toString());
    params.append("ItemsPorPagina",itemsPorPagina.toString());
    return this.httpCliente.get<actorEdicionDTO[]>(this.apiURL,{observe:"response",params});
  }

  public borrar( id: number){
    return this.httpCliente.delete(`${this.apiURL}/${id}`);
  }

  public obtenerPorId( id: number): Observable<actorEdicionDTO> {
    return this.httpCliente.get<actorEdicionDTO>(`${this.apiURL}/${id}`);
  }

  public obtenerPorNombre( nombre: string): Observable<ActorPeliculaDTO[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      toSearch:nombre
    })
    console.log(headers)
    return this.httpCliente.post<ActorPeliculaDTO[]>(`${this.apiURL}/obtenerPorNombre`, 0,{headers});
  }

  public editar( id: number,actor: actorCreacionDTO){
    const formData = this.construirFormData(actor);
    return this.httpCliente.put<actorCreacionDTO>(`${this.apiURL}/${id}`,formData);
  }

}
