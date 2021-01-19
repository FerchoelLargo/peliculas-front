import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { actorCreacionDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.scss']
})
export class IndiceActoresComponent implements OnInit {

  public actores: actorCreacionDTO[] = []
  public columnasAMostrar = ['id','nombre','acciones'];
  public cantidadTotalItems=0;
  public paginaActual = 1;
  public itemsPorPagina = 10;
  public showSpin :boolean = true;

  constructor(private actoresService: ActoresService ) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.itemsPorPagina);
  }

  cargarRegistros( pagina: number, itemsPorPagina:number ):void{
    this.showSpin = true
    this.actoresService.obtenerTodos(pagina,itemsPorPagina)
    .subscribe( (respuesta: HttpResponse<actorCreacionDTO[]>) => {
      this.showSpin = false
      this.actores = respuesta.body
      this.cantidadTotalItems = Number(respuesta.headers.get('cantidadTotalRegistros'));
    },error => {
      console.group(error)
    })
  }

  cambiarPagina(page: PageEvent):void{
    this.paginaActual = page.pageIndex + 1;
    this.itemsPorPagina = page.pageSize;
    this.cargarRegistros(this.paginaActual,this.itemsPorPagina);
  }

  borrar(id: number):void{
    this.actoresService.borrar(id).subscribe(
      ()=> this.cargarRegistros(this.paginaActual,this.itemsPorPagina),
      err => console.log(err)
    )
  }

}
