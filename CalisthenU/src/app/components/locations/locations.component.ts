import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';
import { Location } from 'src/app/shared/services/loc/location';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  constructor(public locService: LocService, public authService: AuthService) { }
  
  //when component initiated => get locations from db to list them inside card
  ngOnInit(): void {
    this.GetLocations();
    for (const loc of this.locations) {
      console.log(loc.payload.doc.data().name);
      console.log(loc.payload.doc.data().latitude);
      console.log(loc.payload.doc.data().longitude);
    }
  }

  //array of locations, filled in directly on init from db
  locations: any = [];

  //call service to fetch data from db and push into locations array
  GetLocations = () =>
    this.locService
    .GetLocations()
    .subscribe(res => (this.locations = res));  

  //when form submitted create new location by calling service which will add location into db, reset form, refresh list, log into console
  onSubmit() {
    // this.locService.form.value.locationName = this.locations;
    if (this.authService.userData != undefined) {
      let data = this.locService.form.value;
      this.locService.CreateLocation(data);
      console.log(data);
      this.locService.form.reset();
    }
    else{
      window.alert("log in to add location")
    }
  }

}

