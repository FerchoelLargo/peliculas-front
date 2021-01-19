import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder,Validators,FormGroup} from '@angular/forms';
import { actorCreacionDTO, actorEdicionDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.scss']
})
export class FormularioActoresComponent implements OnInit {

  @Output()
  private sendForm: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  @Input() private modelo: actorEdicionDTO;
  @Input() public errores: string[] = [];
  @Input() public criticalError: boolean = false;

  public imagenCambiada: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  public form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre:['', { validators:[Validators.required] }  ],
      fechaNacimiento:'',
      foto:'',
      biografia:'',
    })
    
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }

  }

  onSubmit():void{
    if(!this.imagenCambiada){
      this.form.patchValue({foto:null})
    }
    this.sendForm.emit(this.form.value);
  }

  archivoSeleccionado(file:File):void{
    this.imagenCambiada = true
    this.form.get('foto')?.setValue(file);
  }
  
  cambioMarkDown(texto :string):void {
    this.form.get('biografia')?.setValue(texto);
  }


}
