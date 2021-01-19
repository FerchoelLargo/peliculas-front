import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { generoCreacionDTO } from '../generos';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.scss']
})
export class CrearGeneroComponent{
  
  public errores:string[] = []
  public criticalError:boolean = false

  constructor( private router: Router,private generosService: GenerosService) { }

  guardarCambios(genero: generoCreacionDTO):void{
    this.generosService.crear(genero).subscribe(()=>{
      this.router.navigate(['/generos'])
    },err =>{
        this.errores = parseErroresAPI(err)
        if(this.errores.length > 0 && this.errores[0] === 'critical' ){
          this.errores.splice(0,1)
          this.criticalError = true
        }
      }    
    )
  }

}
