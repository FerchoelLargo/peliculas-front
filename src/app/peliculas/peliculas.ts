import { ActorPeliculaDTO } from "../actores/actor";
import { cineDTO } from "../cines/cine";
import { generoDTO } from "../generos/generos";

export interface PeliculascreacionDTO{
  titulo:string,
  resumen:string,
  enCines:Boolean,
  fechaLanzamiento:Date,
  trailer:string,
  poster: File,
  generosIds: number[],
  cinesIds: number[],
  actores: ActorPeliculaDTO[],
};

export interface PeliculaDTO{
  id:number,
  titulo:string,
  resumen:string,
  enCines:Boolean,
  fechaLanzamiento:Date,
  trailer:string,
  poster: String,
  generos: generoDTO[],
  actores: ActorPeliculaDTO[],
  cines: cineDTO[]
}

export interface PeliculasPostGet{
  generos : generoDTO[],
  cines : cineDTO[]
}

export interface PeliculasPutget{
  pelicula: PeliculaDTO;
  generosSeleccionados : generoDTO[];
  generosNoSeleccionados : generoDTO[];
  cinesSeleccionados : cineDTO[];
  cinesNoSeleccionados : cineDTO[];
  actores: ActorPeliculaDTO[];
}

export interface LandingPageDTO{
  enCines: PeliculaDTO[];
  proximosEstrenos: PeliculaDTO[];
}