import { map } from 'rxjs/operators';
import { LocService } from 'src/app/shared/services/loc/loc.service';
import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import {latLng, MapOptions, tileLayer, Map, Marker, icon, LeafletMouseEvent} from 'leaflet';
import * as L from 'leaflet';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { Control, ControlPosition } from 'leaflet';



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
    this.initializeMapOptions();
    this.GetLocations();
    // setTimeout(() => { this.addMarkers(); }, 1000); //solves appendchild error
  }


  onMapReady(map: Map) {
    this.map = map;
    map.on('dblclick', <LeafletMouseEvent>(e: { latlng: any; }) => { 
      console.log(e.latlng);
      // navigator.clipboard.writeText(e.latlng);

      navigator.clipboard.writeText(e.latlng.lat + ',' + e.latlng.lng);
      document.querySelector(".alert").classList.remove("hide");
      setTimeout(() => { document.querySelector(".alert").classList.add("hide"); }, 5000);
     });
     map.doubleClickZoom.disable();

  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(50.84608640041093, 4.351936881811538),
      zoom: 13,
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

  private addCurrentPositionMarker(lat : number, long : number) {
    const marker = new Marker([lat, long])
      .setIcon(
        icon({
          iconSize: [15, 25],
          iconAnchor: [13, 41],
          iconUrl: 'assets/icons/my-marker-icon.png'
        }));
    marker.addTo(this.map);
    marker.bindPopup("<b>I am here!</b>").openPopup();;
  }
  
  //array of locations, filled in directly on init from db
  locations: any = [];
  loopSubscribe: number = 0;
  
  //call service to fetch data from db and push into locations array
  GetLocations = () => {
    this.locService
    .GetLocations()
    .subscribe(res => {
      if (this.loopSubscribe == 0) {
        this.locations = res;
        this.addMarkers(); //gives appendchild error
        this.loopSubscribe = 1
      }
    });
    
    // console.table(this.locations);
  }
    

  public addMarkers() {

    for (const loc of this.locations) {
      let coord = L.latLng((loc.payload.doc.data().locationCoordinates).split(',')[0],(loc.payload.doc.data().locationCoordinates).split(',')[1]);
      let marker = new Marker([coord.lat, coord.lng])
      .setIcon(
        icon({
          iconSize: [15, 25],
          iconAnchor: [13, 41],
          iconUrl: 'assets/icons/marker-icon.png'
        }));
      // console.log(marker);
      marker.addTo(this.map);
      marker.bindPopup(loc.payload.doc.data().locationName);
    }
  }

  GetGeoLocation(){
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(
        'lat: ' + position.coords.latitude, 'long: ' + position.coords.longitude
      )
      this.addCurrentPositionMarker(position.coords.latitude, position.coords.longitude);
      this.map.flyTo(L.latLng(position.coords.latitude, position.coords.longitude),17);
    });
  }

}