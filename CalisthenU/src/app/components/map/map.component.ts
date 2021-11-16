import { map } from 'rxjs/operators';
import { LocService } from 'src/app/shared/services/loc/loc.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import {latLng, MapOptions, tileLayer, Map, Marker, icon, LeafletMouseEvent} from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  map: Map;
  mapOptions: MapOptions;

  constructor(private locService:LocService) {

  }

  ngOnInit() {
    this.GetLocations();
    this.initializeMapOptions();
  }

  onMapReady(map: Map) {
    this.map = map;
    // this.addSampleMarker();
    this.addMarkers();
    map.on('dblclick', <LeafletMouseEvent>(e: { latlng: any; }) => { 
      console.log(e.latlng);
      // navigator.clipboard.writeText(e.latlng);

      navigator.clipboard.writeText(e.latlng.lat + ',' + e.latlng.lng);

     });
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
    for (const loc of this.locations) {
      let coord = L.latLng((loc.payload.doc.data().locationCoordinates).split(',')[0],(loc.payload.doc.data().locationCoordinates).split(',')[1]);
      let marker = new Marker([coord.lat, coord.lng])
        .setIcon(
          icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/marker-icon.png'
          }));
      marker.addTo(this.map);
      marker.bindPopup(loc.payload.doc.data().locationName).openPopup();
    }
  }
}