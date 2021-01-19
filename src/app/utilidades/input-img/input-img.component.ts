import { Component, OnInit, Output,EventEmitter, Input} from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.scss']
})
export class InputImgComponent implements OnInit {

  constructor() { }

  @Input()
  public urlImagenActual: string='';

  @Output()
  private archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();

  public imagenB64:string = '';

  ngOnInit(): void {
  }

  archivoChange(event:any):void{
    if(event.target.files.length>0){
      const file: File = event.target.files[0];
      toBase64(file).then( (result: string) => this.imagenB64 = result);
      this.archivoSeleccionado.emit(file);
      this.urlImagenActual = '';
    }
  }

}
