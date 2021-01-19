import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorPeliculaDTO } from 'src/app/actores/actor';
import { MultipleSelector } from 'src/app/utilidades/selector-multiple/multipleSelector';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { PeliculaDTO, PeliculascreacionDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.scss']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private peliculasService:PeliculasService) { }

  public modelo: PeliculaDTO;

  public generosNoSeleccionados: MultipleSelector[];
  public generosSeleccionados: MultipleSelector[];
  public cinesSeleccionados: MultipleSelector[];
  public cinesNoSeleccionados: MultipleSelector[];
  public actoresSeleccionados: ActorPeliculaDTO[];

  public errores:string[] = []
  public criticalError:boolean = false 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.peliculasService.putGet(params.id).subscribe(
        peliculaReponse => {
          this.modelo = peliculaReponse.pelicula;
          this.generosNoSeleccionados = peliculaReponse.generosNoSeleccionados.map( genero => <MultipleSelector>{ key : genero.id, value : genero.nombre } )
          this.generosSeleccionados = peliculaReponse.generosSeleccionados.map( genero => <MultipleSelector>{ key : genero.id, value : genero.nombre } )

          this.cinesNoSeleccionados = peliculaReponse.cinesNoSeleccionados.map( cine => <MultipleSelector>{ key : cine.id, value : cine.nombre } )
          this.cinesSeleccionados = peliculaReponse.cinesSeleccionados.map( cine => <MultipleSelector>{ key : cine.id, value : cine.nombre } )          
          this.actoresSeleccionados = peliculaReponse.actores;
        },
        error => {

        }
      )
    })
  }

  guardarCambios(pelicula: PeliculascreacionDTO):void{
    this.peliculasService.editar(this.modelo.id ,pelicula).subscribe(
      ()=>alert('exitoso'),
      error=>{
        this.errores = parseErroresAPI(error)
        if(this.errores.length > 0 && this.errores[0] === 'critical' ){
          this.errores.splice(0,1)
          this.criticalError = true
        }
      }
    )
  }

}
