import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { Coordenada, CoordenadaConMensaje } from './coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  @Output()
  private coordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();

  @Input() private coordenadasIniciales: CoordenadaConMensaje[] = [];

  @Input() private soloLectura: Boolean[] = false;

  public capas: Marker<any>[] = [];
  public options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 10,
    center: latLng(16.883157070497994,-99.87121582031251)
  };

  constructor() { }

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map(coord => {
      let markador = marker([coord.latitud,coord.longitud])
      if(coord.mensaje)
        markador.bindPopup(coord.mensaje, {autoClose:false, autoPan:false} )
      return markador
    } )
  }

  clickOnMap(event: LeafletMouseEvent):void{
    if(!this.soloLectura){
      const {lat,lng} = event.latlng;
      this.capas = [ marker([lat,lng]) ]
      this.coordenadaSeleccionada.emit({latitud:lat,longitud:lng})
    }
  }

}
