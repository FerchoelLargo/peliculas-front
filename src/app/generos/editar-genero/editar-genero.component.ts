import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { generoCreacionDTO, generoDTO } from '../generos';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.scss']
})
export class EditarGeneroComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private generosService: GenerosService) { }
  
  public modelo: generoDTO;

  public errores:string[] = []
  public criticalError:boolean = false

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.generosService.obtenerPorId(params.id)
      .subscribe(
        genero => this.modelo = genero,
        () => this.router.navigate(['/generos'])
      )
    })
  }

  guardarCambios(genero: generoCreacionDTO):void{
    this.generosService.editar(this.modelo.id,genero).subscribe(
      ()=>this.router.navigate(['/generos']),
      err =>{
        this.errores = parseErroresAPI(err)
        if(this.errores.length > 0 && this.errores[0] === 'critical' ){
          this.errores.splice(0,1)
          this.criticalError = true
        }
      }
    )
    //this.router.navigate(['/generos'])
  }

}
