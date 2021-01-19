import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CoordenadaConMensaje } from 'src/app/utilidades/mapa/coordenada';
import { PeliculaDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.scss']
})
export class DetallePeliculaComponent implements OnInit {

  constructor(private peliculasService : PeliculasService, private activatedRoute : ActivatedRoute, private sanitizer: DomSanitizer ) { }

  public pelicula: PeliculaDTO;
  public fechaLanzamiento: Date;
  public trailerURL : SafeResourceUrl;
  public coordenadas : CoordenadaConMensaje[] = [];


  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.peliculasService.obtenerPorId(params.id).subscribe(
        pelicula =>{
          this.pelicula = pelicula
          this.fechaLanzamiento = new Date(pelicula.fechaLanzamiento)
          this.coordenadas = pelicula.cines.map( cine => ({latitud: cine.latitud, longitud:cine.longitud, mensaje:cine.nombre}) )
          this.trailerURL = this.generarURLYoutubeEmbed(pelicula.trailer)
          console.log('this.pelicula',this.pelicula)
        },
        error => console.log(error)
      )
    })
  }

  private generarURLYoutubeEmbed(url : any): SafeResourceUrl {
    if(!url)return '';
    let video_id = url.split('v=')
    if(video_id.length > 1){
      video_id = video_id[1]
      const separatorIndex = video_id.indexOf('&');
      if(separatorIndex !== -1 ){
        video_id = video_id.substring(0,separatorIndex)
      }
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video_id}`)
    }
    return '';
  }
}
