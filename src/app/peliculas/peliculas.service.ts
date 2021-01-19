import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { PeliculaDTO, PeliculascreacionDTO, PeliculasPostGet,LandingPageDTO, PeliculasPutget } from './peliculas';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http:  HttpClient) { }

  private apiURL = environment.apiURL+'peliculas';

  public obtenerPorId(id: number):Observable<PeliculaDTO>{
    return this.http.get<PeliculaDTO>(`${this.apiURL}/${id}`)
  }

  public postGet():Observable<PeliculasPostGet>{
    return this.http.get<PeliculasPostGet>(`${this.apiURL}/PostGet`)
  }

  public putGet(id:number):Observable<PeliculasPutget>{
    return this.http.get<PeliculasPutget>(`${this.apiURL}/PutGet/${id}`)
  }

  public crear(pelicula:  PeliculascreacionDTO){
    const formData = this.creaFormData(pelicula)
    return this.http.post(`${this.apiURL}`,formData)
  }

  public editar(id:number, pelicula:  PeliculascreacionDTO){
    console.log(pelicula)
    const formData = this.creaFormData(pelicula)
    return this.http.put(`${this.apiURL}/${id}`,formData)
  }

  private creaFormData(pelicula:  PeliculascreacionDTO):FormData{
    const formData = new FormData();

    formData.append('titulo',pelicula.titulo)
    formData.append('resumen',pelicula.resumen)
    formData.append('trailer',pelicula.trailer )
    formData.append('enCines',String(pelicula.enCines))

    if(pelicula.fechaLanzamiento)
      formData.append('fechaLanzamiento',formatearFecha(pelicula.fechaLanzamiento))
    if(pelicula.poster)
      formData.append('poster',pelicula.poster)
    
    formData.append('cinesIds',JSON.stringify(pelicula.cinesIds ))
    formData.append('generosIds',JSON.stringify(pelicula.generosIds))
    formData.append('actores',JSON.stringify(pelicula.actores))
    return formData;
  }

  public landingData(): Observable<LandingPageDTO>{
    return this.http.get<LandingPageDTO>(`${this.apiURL}/LandingData`)
  }


}
