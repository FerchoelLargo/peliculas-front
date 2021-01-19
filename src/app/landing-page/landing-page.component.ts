import { Component, OnInit } from '@angular/core';
import { PeliculaDTO } from '../peliculas/peliculas';
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

	constructor(private peliculasService:PeliculasService) {  }
	
  public peliculasEnCines: PeliculaDTO[] = [];
  public proximosEstrenos: PeliculaDTO[] = [];

  ngOnInit(): void {
		this.peliculasService.landingData().subscribe( ladingData => {
			this.peliculasEnCines = ladingData.enCines
			this.proximosEstrenos = ladingData.proximosEstrenos
		})
  }

}
