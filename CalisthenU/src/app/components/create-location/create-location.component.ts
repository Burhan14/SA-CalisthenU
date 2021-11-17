import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  constructor(public authService: AuthService, public locService: LocService, public router: Router) { }

  ngOnInit(): void {
  }

  //when form submitted create new location by calling service which will add location into db, reset form, refresh list, log into console
  onSubmit() {
    // this.locService.form.value.locationName = this.locations;
    if (this.authService.userData != undefined) {
      let data = this.locService.form.value;
      this.locService.CreateLocation(data);
      console.log(data);
      this.locService.form.reset();
      this.router.navigate(['dashboard']);
    }
    else{
      window.alert("log in to add location")
    }
  }
}
