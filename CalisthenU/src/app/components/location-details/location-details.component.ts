import { LocService } from 'src/app/shared/services/loc/loc.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parseActionCodeURL } from '@firebase/auth';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  id: string; //id of this location
  private sub: any;
  location: any
  name: string;
  description: string;
  coordinates: string;
  access: string;
  images: any;
  exercises: any;
  createdBy: string;
  fullAddress: string;
  avgrating: number;

  fav:HTMLElement = <HTMLElement>document.getElementById("fav");

  currentUserFavs: Array<string> = new Array();


  constructor(private route:ActivatedRoute, private locService:LocService, public authService: AuthService, private titleService:Title) {}
  
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.GetLocation();
      this.GetFavLocations();
    })


  }

  GetFavLocations() {
    let loopCount = 0;
    this.currentUserFavs = [];
    if (this.authService.userData == undefined) return;
    this.locService
      .GetUsersFavLocs(this.authService.userData.uid)
      .subscribe(res => {
        if (loopCount < 1) {
          for (let loc of res) {
            this.currentUserFavs.push(loc.payload.doc.data().locId);
          }
          loopCount++
        }
        this.CheckFav()
      });

  }

  CheckFav() {
    let fav = <HTMLElement>document.getElementById("fav");
    if (this.currentUserFavs.includes(this.id)) {
      fav.classList.remove("far");
      fav.classList.add("fas");
    }
  }

  GoBack = () => history.back()

  AddFav () {
    let fav = <HTMLElement>document.getElementById("fav");
    if (fav.classList.contains("far")) { //if not faved, add to favs
      this.locService.AddToFavs(this.authService.userData.uid, this.id).then(res => {
        fav.classList.remove("far");
        fav.classList.add("fas");
      })
    }
    else{ //if faved, remove from favs
      this.locService.RemoveFromFavs(this.authService.userData.uid, this.id).then(res => {
        fav.classList.remove("fas");
        fav.classList.add("far");
      })
    }
  }


  GetLocation = () => {
    let loopCount= 0;
    this.locService
    .GetLocationSingle(this.id)
    .subscribe(res => {
      this.location = res.payload.data();
      this.name = this.location.locationName;
      this.description = this.location.locationDescription;
      this.coordinates = this.location.locationCoordinates;
      this.access = this.location.locationAccess;
      this.images = this.location.images;
      this.exercises = this.location.exercises;
      this.createdBy = this.location.createdByDN;
      this.avgrating = this.location.avgRating;

      //change page title
      this.titleService.setTitle("Calisthen-U | " + this.name);

      let root = document.documentElement;
      root.style.setProperty('--value', this.location.avgRating.toString());

      if(loopCount < 1){
        let lat = this.coordinates.split(',')[0]
        let lng = this.coordinates.split(',')[1]


        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyCYA3o-l43alSHU-MDnw9G-dWnd0DAQdZE')
        .then(response => response.json())
        .then(data => {this.fullAddress = data.results[0].formatted_address;});

        loopCount++;
      }

    })
  }


}
