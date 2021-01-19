import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { generoDTO } from '../generos';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.scss']
})
export class IndiceGenerosComponent implements OnInit {

  public generos: generoDTO[] = []
  public columnasAMostrar = ['id','nombre','acciones'];
  public cantidadTotalItems=0;
  public paginaActual = 1;
  public itemsPorPagina = 10;
  public showSpin :boolean = true;

  constructor( private generosService: GenerosService ) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.itemsPorPagina);
  }

  cargarRegistros( pagina: number, itemsPorPagina:number ):void{
    this.showSpin = true
    this.generosService.obtenerTodos(pagina,itemsPorPagina)
    .subscribe( (respuesta: HttpResponse<generoDTO[]>) => {
      this.showSpin = false
      this.generos = respuesta.body
      this.cantidadTotalItems = respuesta.headers.get('cantidadTotalRegistros');      
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
    this.generosService.borrar(id).subscribe(
      ()=> this.cargarRegistros(this.paginaActual,this.itemsPorPagina),
      err => console.log(err)
    )
  }

}