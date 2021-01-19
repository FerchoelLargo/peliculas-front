import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-listado-generico',
  templateUrl: './listado-generico.component.html',
  styleUrls: ['./listado-generico.component.scss']
})
export class ListadoGenericoComponent implements OnInit {

  constructor() { }

  @Input() public listado:any = null;

  ngOnInit(): void {
  }

}
