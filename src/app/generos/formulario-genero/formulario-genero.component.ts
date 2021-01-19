import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { primeraLetraMayususcula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../generos';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.scss']
})
export class FormularioGeneroComponent implements OnInit {

  constructor(  private formBuilder: FormBuilder  ) { }

  public form: FormGroup;

  @Input() public errores: string[] = [];
  @Input() public criticalError: boolean = false;

  @Input() private modelo: generoCreacionDTO;

  @Output()
  private sendForm: EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre:['',{ validators:[Validators.required,Validators.minLength(3), primeraLetraMayususcula(), Validators.maxLength(50)] } ]
    })
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo)
    }
  }

  obtenerErrorCampoNombre(): String{
    let campo = this.form.get('nombre');
    if(campo?.hasError('required')){
      return "El campo nombre es requerido."
    }
    if(campo?.hasError('minlength')){
      return "La longitud mínima es 3 caracteres."
    }
    if(campo?.hasError('maxLength')){
      return "La longitud máxima es 50 caracteres."
    }
    if(campo?.hasError('primeraLetraMayususcula'))
      return campo.getError('primeraLetraMayususcula').mensaje;
    return "";
  }

  guardarCambios(){
    this.sendForm.emit(this.form.value)
  }

}
