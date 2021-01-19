import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  constructor() { }
  @Input() maximoRating : number = 5;

  @Output() rated : EventEmitter<number> = new EventEmitter<number>();

  ratingSeleccionado:number = 0;
  ratingSeleccionadoAnterior:number = 0;

  maximoRatingArr : Array<number> = [];

  ngOnInit(): void {
  	this.maximoRatingArr = Array(this.maximoRating).fill(0);
  }

  mouseenter(index:number):void{
  	this.ratingSeleccionado = index+1;
  }

  mouseleave():void{
  	if(this.ratingSeleccionadoAnterior !== 0){
  		this.ratingSeleccionado = this.ratingSeleccionadoAnterior;

  	}else{
  		this.ratingSeleccionado = 0;
  	}
  }

  rate(index:number):void{
  	this.ratingSeleccionado = index+1;
    this.ratingSeleccionadoAnterior = index+1;
    this.rated.emit(this.ratingSeleccionado)
  }

}
