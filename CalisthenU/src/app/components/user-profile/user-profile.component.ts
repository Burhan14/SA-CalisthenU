import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, private locService: LocService, public titleService: Title) {
    //change page title
    this.titleService.setTitle("Calisthen-U | Profile");
  }

  myLocationsRAW: any = [];
  myLocations: Array<any> = new Array();
  favLocations: any = [];
  online: boolean;


  ngOnInit(): void {
    if (this.authService.userData == undefined) {
      this.router.navigate(['dashboard']);
    }
    this.myLocationsRAW = [];
    this.myLocations = [];
    this.GetMyLocations();
    this.favLocations = [];
    this.GetFavLocations();

    if (navigator.onLine) {
      this.online = true
    }
    else {
      this.online = false
    }

    window.addEventListener('online', () => {
      this.myLocationsRAW = [];
      this.myLocations = [];
      this.online = true
    });
    window.addEventListener('offline', () => {
      this.myLocationsRAW = [];
      this.myLocations = [];
      this.online = false
    });
  }


  GetMyLocations = () => {
    this.myLocationsRAW = [];
    this.myLocations = [];
    this.locService
      .GetLocations()
      .subscribe(res => {
        this.myLocationsRAW = res;
        for (let loc of this.myLocationsRAW) {
          if (this.authService.userData != undefined) {
            if (loc.payload.doc.data().createdByUID == this.authService.userData.uid) {
              this.myLocations.push(loc)
            }
          }
        }
      });
  }


  GetFavLocations = () => {
    let loopCount = 0;

    if (this.authService.userData == undefined) return;
    this.locService
      .GetUsersFavLocs(this.authService.userData.uid)
      .subscribe(res => {
        if (loopCount < 1) {
          for (let loc of res) {
            let loopCount2 = 0;
            this.locService.GetLocationSingle(loc.payload.doc.data().locId)
              .subscribe(res2 => {
                if (loopCount2 < 1) {
                  if (res2.type == "removed") return
                  this.favLocations.push(res2);
                  // console.log(this.favLocations);
                  loopCount2++
                }
              })
          }
          loopCount++
        }
      });
  }

  DeleteLocation = (locId: string) =>
    this.locService
      .DeleteLocation(locId).then(res => {
        this.myLocationsRAW = [];
        this.myLocations = [];
        this.GetMyLocations();
      });

  UpdateLocation = (locId: string, authorId: string) => {
    if (this.authService.userData.uid == authorId) {
      this.router.navigate(['location-edit', locId])
    } else {
      console.log("you cant edit this location")
    }
  }
}
