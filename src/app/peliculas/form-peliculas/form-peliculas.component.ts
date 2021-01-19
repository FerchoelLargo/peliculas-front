import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActorPeliculaDTO } from 'src/app/actores/actor';
import { MultipleSelector } from 'src/app/utilidades/selector-multiple/multipleSelector';
import { PeliculaDTO, PeliculascreacionDTO } from '../peliculas';

@Component({
  selector: 'app-form-peliculas',
  templateUrl: './form-peliculas.component.html',
  styleUrls: ['./form-peliculas.component.scss']
})
export class FormPeliculasComponent implements OnInit {

  @Input() public modelo: PeliculaDTO;  

  @Input()  public generosNoSeleccionados:MultipleSelector[] = [];
  @Input()  public cinesNoSeleccionados:MultipleSelector[] = [];

  @Input()  public actoresSeleccionados: ActorPeliculaDTO[] = [];

  @Output() private sendForm: EventEmitter<PeliculascreacionDTO> = new EventEmitter<PeliculascreacionDTO>();

  @Input() public errores: string[] = [];
  @Input() public criticalError: boolean = false;

  @Input() public generosSeleccionados:MultipleSelector[] = [];  
  @Input() public cinesSeleccionados:MultipleSelector[] = [];

  public form: FormGroup;

  private imgenCambiada = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['',{validators:[Validators.required]}] ,
      resumen:'',
      enCines:false,
      trailer:'',
      fechaLanzamiento:'',
      poster:'',
      generosIds:[],
      cinesIds:[],
      actores:'',
    })
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo)
    }
  }

  onSubmit():void {
    const generosId = this.generosSeleccionados.map(genero => genero.key)
    this.form.get('generosIds')?.setValue(generosId)

    const cinesId = this.cinesSeleccionados.map(cine => cine.key)
    this.form.get('cinesIds')?.setValue(cinesId)

    const actores = this.actoresSeleccionados.map(actor => ({ id : actor.id, personaje: actor.personaje }) );
    this.form.get('actores').setValue(actores)

    if(!this.imagenCambiada){
      this.form.patchValue({'poster':null})
    }

    this.sendForm.emit(this.form.value);
  }

  archivoSeleccionado(file:File):void{
    this.imgenCambiada = true;
    this.form.get('poster').setValue(file);
  }
  
  cambioMarkDown(texto :string):void {
    this.form.get('resumen').setValue(texto);
  }

}
