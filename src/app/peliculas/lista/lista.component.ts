import { Component, OnInit, Input } from '@angular/core';
import { PeliculaDTO } from '../peliculas';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})

export class ListaComponent implements OnInit{

  constructor() { }

  @Input() public peliculas:PeliculaDTO[];
  
  ngOnInit(): void { }

  eliminar(index: number):void{
  	this.peliculas.splice(index,1)
  }

  manejarRated(voto:number):void{
    alert(voto)
  }

}
