import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.scss']
})
export class CrearCineComponent  {

  constructor(private cinesService: CinesService, private router:Router ) { }

  public errores:string[] = []
  public criticalError:boolean = false

  guardarCambios(cine: cineCreacionDTO):void{
    this.cinesService.crear(cine).subscribe(
      ()=>{
        this.router.navigate(['/cines'])
      },error=>{
        this.errores = parseErroresAPI(error)
        if(this.errores.length > 0 && this.errores[0] === 'critical' ){
          this.errores.splice(0,1)
          this.criticalError = true
        }
      }
    )
  }

}
