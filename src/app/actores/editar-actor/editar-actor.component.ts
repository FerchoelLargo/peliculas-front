import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { actorCreacionDTO, actorEdicionDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.scss']
})
export class EditarActorComponent implements OnInit {

  modelo : actorEdicionDTO;

  public errores:string[] = []
  public criticalError:boolean = false

  constructor(private activatedRoute: ActivatedRoute, private actoresService: ActoresService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.actoresService.obtenerPorId(params.id).subscribe(
        (actor)=>{
          this.modelo = actor
        },error =>
          this.router.navigate(['/actores'])
      )
    })
  }

  guardarCambios(actor: actorCreacionDTO):void{
    this.actoresService.editar(this.modelo.id ,actor).subscribe(
      ()=>this.router.navigate(['/actores']),
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