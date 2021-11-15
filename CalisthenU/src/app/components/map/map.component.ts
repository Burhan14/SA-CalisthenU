import { map } from 'rxjs/operators';
import { LocService } from 'src/app/shared/services/loc/loc.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map!: Map;
  mapOptions!: MapOptions;

  constructor(private locService:LocService) {

  }

  ngOnInit() {
    this.GetLocations();
    console.log(this.locations);
    
    this.initializeMapOptions();

  }

  onMapReady(map: Map) {
    this.map = map;
    // this.addSampleMarker();
    this.addMarkers();
    console.log(this.locations);
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(50.89135088475702, 4.4267068827850355),
      zoom: 17,
      layers: [
        tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };
  }

  // private addSampleMarker() {
  //   const marker = new Marker([50.8503, 4.3517])
  //     .setIcon(
  //       icon({
  //         iconSize: [25, 41],
  //         iconAnchor: [13, 41],
  //         iconUrl: 'assets/marker-icon.png'
  //       }));
  //   marker.addTo(this.map);
  // }
  
  //array of locations, filled in directly on init from db
  locations: any = [];

  //call service to fetch data from db and push into locations array
  GetLocations = () =>
    this.locService
    .GetLocations()
    .subscribe(res => (this.locations = res));

  public addMarkers() {
    console.table(this.locations);
    for (const loc of this.locations) {
      console.log(loc);
      let marker = new Marker([loc.payload.doc.data().locationLatitude, loc.payload.doc.data().locationLongitude])
        .setIcon(
          icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/marker-icon.png'
          }));
      marker.addTo(this.map);
      marker.bindPopup(loc.payload.doc.data().locationName).openPopup();
      console.log(marker.getLatLng());
    }
  }
}