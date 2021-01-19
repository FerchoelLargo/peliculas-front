import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { ActorPeliculaDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-actores-autocomplete',
  templateUrl: './actores-autocomplete.component.html',
  styleUrls: ['./actores-autocomplete.component.scss']
})
export class ActoresAutocompleteComponent implements OnInit {

  public formControl: FormControl = new FormControl();

  @ViewChild(MatTable) table : MatTable<any>;

  @Input() public actoresSeleccionados:ActorPeliculaDTO[] = [];

  public actoresParaMostrar:ActorPeliculaDTO[] = [];

  public columnasAMostrar = ['imagen','nombre','personaje','acciones'];

  constructor(private actoresService:ActoresService) { }

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe(nombre => {
      this.actoresService.obtenerPorNombre(nombre).subscribe(
        actores => this.actoresParaMostrar = actores,
        err => console.log(err)
      )
    })
  }

  actorElegido(event : MatAutocompleteSelectedEvent):void{
    const {value} = event.option
    
    this.formControl.patchValue('')

    if(this.actoresSeleccionados.includes(value))
      return

    this.actoresSeleccionados.push(value)
    if(this.table !== undefined ){
      this.table.renderRows();
    }
  }

  eliminar(actor:any):void{
    const index = this.actoresSeleccionados.findIndex( a => a.nombre === actor.nombre)
    this.actoresSeleccionados.splice(index,1)
    if(this.table !== undefined ){
      this.table.renderRows();
    }
  }

  onDragEnd(event: CdkDragDrop<any>):void{
    moveItemInArray(this.actoresSeleccionados,event.previousIndex,event.currentIndex)
    if(this.table !== undefined ){
      this.table.renderRows();
    }
  }

}
