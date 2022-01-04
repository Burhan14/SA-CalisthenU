import { LocService } from 'src/app/shared/services/loc/loc.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parseActionCodeURL } from '@firebase/auth';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  id:string;
  private sub: any;
  location:any
  name:string;
  description:string;
  coordinates:string;
  access:string;
  images:any;
  exercises:any;
  createdBy:string;
  fullAddress: string;


  constructor(private route:ActivatedRoute, private locService:LocService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.GetLocation();
      // console.log(params['id']);
    })
  }

  GoBack = () => history.back()

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

      // console.log(res.payload.data());

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

  Share(){
    const title = window.document.title;
    const url = window.document.location.href;

    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }


}
