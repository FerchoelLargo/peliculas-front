import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { actorCreacionDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.scss']
})
export class CrearActorComponent implements OnInit {

  constructor(private actoresServices: ActoresService,private router:Router) { }

  public errores:string[] = []
  public criticalError:boolean = false

  ngOnInit(): void {
  }

  guardarCambios(actor: actorCreacionDTO):void{
    this.actoresServices.crear(actor).subscribe(
      ()=>{
        this.router.navigate(['/actores'])
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