import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-errores',
  templateUrl: './lista-errores.component.html',
  styleUrls: ['./lista-errores.component.scss']
})
export class ListaErroresComponent implements OnInit {

  @Input() public errores:string[] = []
  
  @Input() public criticalError:boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
