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
  
  myLocationsRAW: any = [];
  myLocations: Array<any> = new Array();
  favLocations: any = [];


  ngOnInit(): void {
    if (this.authService.userData == undefined) {
      this.router.navigate(['dashboard']);
    }
    this.myLocationsRAW = [];
    this.myLocations = [];
    this.GetMyLocations();
    this.favLocations = [];
    this.GetFavLocations();

  }



  GetMyLocations = () =>
    this.locService
    .GetLocations()
    .subscribe(res => {
      this.myLocationsRAW = res; 
      for (let loc of this.myLocationsRAW) {
        if (this.authService.userData != undefined) {
          if (loc.payload.doc.data().createdByUID == this.authService.userData.uid)  {
            this.myLocations.push(loc)
          }
        }
      }
    }); 
    
  GetFavLocations = (id: string = this.authService.userData.uid) =>
    this.locService
    .GetUsersFavLocs(id)
    .subscribe(res => {
      console.log(res);
      for (let loc of res) {
        this.locService.GetLocationSingle(loc.payload.doc.data().createdByUID)
        .subscribe(res2 => {
          this.favLocations = res2;
        })
      }
      console.log(this.favLocations);
    });

  DeleteLocation = (locId: string) =>
    this.locService
    .DeleteLocation(locId).then(res => {
      this.myLocationsRAW = [];
      this.myLocations = [];
      this.GetMyLocations();
    });

  UpdateLocation = (locId: string, authorId: string) => {
    if(this.authService.userData.uid == authorId) {
      this.router.navigate(['location-edit', locId])
    }else{
      console.log("you cant edit this location")
    }
  }
}
