import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO, cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.scss']
})
export class EditarCineComponent implements OnInit {

  public errores:string[] = []
  public criticalError:boolean = false

  public modelo: cineDTO;

  constructor(private activatedRoute:ActivatedRoute, private cinesService : CinesService,private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.cinesService.obtenerPorId(params.id).subscribe(
        cine => this.modelo = cine,
        () => this.router.navigate(['/cines'])
      )
    })
  }

  guardarCambios(cine: cineCreacionDTO):void{
    this.cinesService.editar(this.modelo.id,cine).subscribe(
      () => this.router.navigate(['/cines']),
      err =>{
        this.errores = parseErroresAPI(err)
        if(this.errores.length > 0 && this.errores[0] === 'critical' ){
          this.errores.splice(0,1)
          this.criticalError = true
        }
      }
    )
  }

}
