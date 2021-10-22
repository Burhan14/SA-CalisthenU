// import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';


// declare var H: any;

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.css']
// })
// export class MapComponent implements OnInit {

//   @ViewChild("map")
//   public mapElement!: ElementRef;

//   @Input()
//   public _apikey: any;

//   @Input()
//   public lat: any;

//   @Input()
//   public lng: any;

//   @Input()
//   public width: any;

//   @Input()
//   public height: any;

//   public constructor() { }

//   public ngOnInit() { }

//   public ngAfterViewInit() {
//       let platform = new H.service.Platform({
//           "apikey": this._apikey
//       });
      
//       let defaultLayers = platform.createDefaultLayers();
//       let map = new H.Map(
//           this.mapElement.nativeElement,
//           defaultLayers.vector.normal.map,
//           {
//               zoom: 10,
//               center: { lat: this.lat, lng: this.lng }
//           }
//       );
//   }
// }

import {Component, OnInit} from '@angular/core';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map!: Map;
  mapOptions!: MapOptions;

  constructor() {
  }

  ngOnInit() {
    this.initializeMapOptions();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.addSampleMarker();
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(51.505, 0),
      zoom: 12,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };
  }

  private addSampleMarker() {
    const marker = new Marker([51.51, 0])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png'
        }));
    marker.addTo(this.map);
  }

}