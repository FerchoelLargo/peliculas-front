import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { actorCreacionDTO } from 'src/app/actores/actor';
import { cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.scss']
})
export class IndiceCinesComponent implements OnInit {

  constructor( private cinesService : CinesService, ) { }

  public cines: cineDTO[] = []
  public columnasAMostrar = ['id','nombre','acciones'];
  public cantidadTotalItems=0;
  public paginaActual = 1;
  public itemsPorPagina = 10;
  public showSpin :boolean = true;

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.itemsPorPagina);
  }

  private cargarRegistros(pagina: number, itemsPorPagina:number ):void{
    this.showSpin = true
    this.cinesService.obtenerTodos(pagina,itemsPorPagina)
    .subscribe( (respuesta: HttpResponse<actorCreacionDTO[]>) => {
      this.showSpin = false
      this.cines = respuesta.body
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
    this.cinesService.borrar(id).subscribe(
      ()=> this.cargarRegistros(this.paginaActual,this.itemsPorPagina),
      err => console.log(err)
    )
  }

}
