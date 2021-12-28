import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  constructor(private locService: LocService, private router: Router,private route:ActivatedRoute, private authService: AuthService) { }

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
  authorId: string;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.GetLocation();
      // console.log(params['id']);
    })
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
      this.authorId = this.location.createdByUID;

      

      // console.log(res.payload.data());

      if(loopCount < 1){
        
        if (this.authorId == this.authService.userData.uid) {
          console.log("correct user");
        } else {
          console.log("wrong user");
          this.router.navigate(["unauthorized"]);
        }
        
        loopCount++;
        
                // let lat = this.coordinates.split(',')[0]
                // let lng = this.coordinates.split(',')[1]
        
        
                // fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyCYA3o-l43alSHU-MDnw9G-dWnd0DAQdZE')
                // .then(response => response.json())
                // .then(data => {this.fullAddress = data.results[0].formatted_address;});
      }

    })
  }

}
