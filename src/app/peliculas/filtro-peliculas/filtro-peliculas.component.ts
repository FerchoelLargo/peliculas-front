import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


interface formularioVacio{
  titulo:string,
  proximosEstrenos:boolean,
  enCines:boolean,
  /**/
  generoId?:number,
  generosId?:Array<number>,
  poster?:string,
}


@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.scss']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private location:Location,
    private activatedRoute:ActivatedRoute,
    ) { }

  private formVacio: formularioVacio = {
    titulo:'',
    generoId:0,
    proximosEstrenos:false,
    enCines:false
  };

  public form: FormGroup;

  public generos = [
    {nombre:'Drama',id:1},
    {nombre:'Acción',id:2},
    {nombre:'Comedia',id:3},
  ]

  public peliculasInicial : Array<formularioVacio> = [
    {
			titulo:'Spiderman-1',generosId:[1], proximosEstrenos:true, enCines:false,poster:'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_UX182_CR0,0,182,268_AL_.jpg'
		},
		{
      titulo:'Spiderman-2', generosId:[1,3], proximosEstrenos:false, enCines:true, poster:'https://m.media-amazon.com/images/M/MV5BMzY2ODk4NmUtOTVmNi00ZTdkLTlmOWYtMmE2OWVhNTU2OTVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY268_CR6,0,182,268_AL_.jpg'
		},
		{
      titulo:'Spiderman-3', generosId:[3], proximosEstrenos:false, enCines:false, poster:'https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UX182_CR0,0,182,268_AL_.jpg'
		}
  ];
  
  peliculas = this.peliculasInicial;

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formVacio);
    this.leerValoresBusqueda();
    this.filtrarPeliculas(this.form.value);
    this.form.valueChanges.subscribe( values => {
      this.filtrarPeliculas(values);
      this.escribirValoresBusqueda(values);
    })
  }
  
  private leerValoresBusqueda():void{
    this.activatedRoute.queryParams.subscribe(params => {
      let obj :formularioVacio = {titulo:'', generoId:0, proximosEstrenos:false, enCines:false};
      if(params['titulo'])
        obj['titulo'] = params['titulo'];

      if(params['generoId'])
        obj['generoId'] = Number(params['generoId']);

      if(params['proximosEstrenos'])
        obj['proximosEstrenos'] = params['proximosEstrenos'](Boolean);
      
      if(params['enCines'])
        obj['enCines'] = params['enCines'](Boolean);
      
      this.form.patchValue(obj);
    })
  }

  private escribirValoresBusqueda(values: formularioVacio):void{
    let queryString: Array<string>=[];
    if(values['titulo'])
      queryString.push(`titulo=${values['titulo']}`);

    if(values['generoId'])
      queryString.push(`generoId=${values['generoId']}`);

    if(values['proximosEstrenos'])
      queryString.push(`proximosEstrenos=${values['proximosEstrenos']}`);
    
    if(values['enCines'])
      queryString.push(`enCines=${values['enCines']}`);

    this.location.replaceState('peliculas/buscar',queryString.join('&'))
  }

  private filtrarPeliculas(values: formularioVacio):void{    
    this.peliculas = this.peliculasInicial;
    if(values['titulo'])
      this.peliculas = this.peliculas.filter(pelicula => pelicula['titulo'].toLowerCase().includes(values['titulo'].toLowerCase()) );

    if(values['generoId'])
      this.peliculas = this.peliculas.filter(pelicula => pelicula['generosId'] && pelicula['generosId'].includes(values['generoId']) );

    if(values['proximosEstrenos'])
      this.peliculas = this.peliculas.filter(pelicula => pelicula['proximosEstrenos'] );
    
    if(values['enCines'])
      this.peliculas = this.peliculas.filter(pelicula => pelicula['enCines']);
  }

  limpiarFiltros():void{
    this.form.patchValue(this.formVacio);
  }

}
