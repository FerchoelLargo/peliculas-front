import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coordenada } from 'src/app/utilidades/mapa/coordenada';
import { cineCreacionDTO, cineDTO } from '../cine';

@Component({
  selector: 'app-formulario-cines',
  templateUrl: './formulario-cines.component.html',
  styleUrls: ['./formulario-cines.component.scss']
})
export class FormularioCinesComponent implements OnInit {

  @Input() private modelo: cineDTO;
  @Input() public errores: string[] = [];
  @Input() public criticalError: boolean = false;

  @Output() private sendForm: EventEmitter<cineCreacionDTO> = new EventEmitter<cineCreacionDTO>();

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder ) {  }

  public coordenadaInicial: Coordenada[] = []

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [ '' , {validators:[Validators.required]} ],
      latitud: [ '' , {validators:[Validators.required]} ],
      longitud: [ '' , {validators:[Validators.required]} ]
    })
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo)
      this.coordenadaInicial.push({latitud:this.modelo.latitud,longitud:this.modelo.longitud})
    }
  }

  onSubmit():void{
    this.sendForm.emit(this.form.value)
  }

  coordenadaSeleccionada(coordenada: Coordenada):void{
    this.form.patchValue(coordenada)
  }

}
