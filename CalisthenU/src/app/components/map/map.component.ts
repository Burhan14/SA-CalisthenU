import { LocService } from 'src/app/shared/services/loc/loc.service';
import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, Marker, icon } from 'leaflet';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: Map;
  mapOptions: MapOptions;
  coords: string;

  constructor(private locService: LocService, private router: Router) {

  }

  ngOnInit() {
    this.initializeMapOptions();
    this.GetLocations();

    window.onclick = e => {
      let id = (e.target as Element).id.split(" ")[0];
      if (id == 'marker-detail') {
        this.router.navigate(['location-details', (e.target as Element).id.split(" ")[1]]);
      }
    }
  }

  onMapReady(map: Map) {
    this.map = map;
    map.on('dblclick', <LeafletMouseEvent>(e: { latlng: any; }) => {
      this.coords = e.latlng.lat + ',' + e.latlng.lng;
      navigator.clipboard.writeText(this.coords);
      document.querySelector(".alertCopy").classList.remove("hide");
      setTimeout(() => {
        let alert = document.querySelector(".alertCopy");
        if (alert) {
          alert.classList.add("hide");
        }
      }, 4000);
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

  private addCurrentPositionMarker(lat: number, long: number) {
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
  GetLocations() {
    this.locService
      .GetLocations()
      .subscribe(res => {
        if (this.loopSubscribe == 0) {
          this.locations = res;
          try {
            this.addMarkers();
          } catch (error) {}
          this.loopSubscribe = 1
        }
      });
  }

  public addMarkers() {

    for (const loc of this.locations) {
      let coord = L.latLng((loc.payload.doc.data().locationCoordinates).split(',')[0], (loc.payload.doc.data().locationCoordinates).split(',')[1]);
      let marker = new Marker([coord.lat, coord.lng])
        .setIcon(
          icon({
            iconSize: [15, 25],
            iconAnchor: [13, 41],
            iconUrl: 'assets/icons/marker-icon.png'
          }));
      marker.addTo(this.map);
      marker.bindPopup('<a style="color: white; text-decoration:none;" class="marker btn btn-custom" id="marker-detail ' + loc.payload.doc.id + '">' + loc.payload.doc.data().locationName + '</a>');
    }
  }

  public GoToDetails(id: string) {
    this.router.navigate(['location-details', id]);
  }

  GetGeoLocation() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(
        'lat: ' + position.coords.latitude, 'long: ' + position.coords.longitude
      )
      this.addCurrentPositionMarker(position.coords.latitude, position.coords.longitude);
      this.map.flyTo(L.latLng(position.coords.latitude, position.coords.longitude), 17);
    });
  }

  PasteCoords() {
    document.querySelector(".alertCopy").classList.add("hide");
    setTimeout(() => { let coordsInput = <HTMLInputElement>document.getElementById("coordinates"); coordsInput.focus(); coordsInput.value = this.coords; }, 200);
  }

}

