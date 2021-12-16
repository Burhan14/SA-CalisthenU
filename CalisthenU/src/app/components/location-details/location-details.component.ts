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


  constructor(private route:ActivatedRoute, private locService:LocService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.GetLocation();
      // console.log(params['id']);
    })
  }

  GetLocation = () => 
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




      console.log(res.payload.data());
    }) 

}
