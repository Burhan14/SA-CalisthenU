import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, private locService: LocService) { }

  ngOnInit(): void {
    if (this.authService.userData == undefined) {
      this.router.navigate(['dashboard']);
    }
    this.GetMyLocations()
    
  }

  showInConsole(){
    for (let loc of this.myLocations) {
      console.log(loc.payload.doc.data());
    }
  }

  myLocationsRAW: any = [];
  myLocations: Array<any> = new Array();


  GetMyLocations = () =>
    this.locService
    .GetLocations()
    .subscribe(res => {
      this.myLocationsRAW = res; 
      for (let loc of this.myLocationsRAW) {
        if (loc.payload.doc.data().createdByUID == this.authService.userData.uid)  {
          this.myLocations.push(loc)
        }
      }
    });  

}
