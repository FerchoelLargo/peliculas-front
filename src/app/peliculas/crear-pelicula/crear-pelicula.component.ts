import { Component, OnInit } from '@angular/core';
import { MultipleSelector } from 'src/app/utilidades/selector-multiple/multipleSelector';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { PeliculascreacionDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.scss']
})
export class CrearPeliculaComponent implements OnInit {

  constructor( private peliculasService : PeliculasService ) { }

  public generosNoSeleccionados : MultipleSelector[]
  public cinesNoSeleccionados : MultipleSelector[]
  
  public errores:string[] = []
  public criticalError:boolean = false  

  ngOnInit(): void {
    this.peliculasService.postGet().subscribe(
      (resultado) => {
        this.generosNoSeleccionados = resultado.generos.map( genero => <MultipleSelector>{ key : genero.id, value : genero.nombre } )
        this.cinesNoSeleccionados = resultado.cines.map( cine => <MultipleSelector>{ key : cine.id, value : cine.nombre } )
      },
      error=>{
        this.errores = parseErroresAPI(error)
        console.log(this.errores)
        if(this.errores.length > 0 && this.errores[0] === 'critical' ){
          this.errores.splice(0,1)
          this.criticalError = true
        }
      }
    )
  }

  guardarCambios(pelicula: PeliculascreacionDTO):void{    
    this.peliculasService.crear(pelicula).subscribe(
      ()=>alert('ecitoso'),
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