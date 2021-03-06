import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class CreateLocationComponent implements OnInit {

  constructor(public authService: AuthService, public locService: LocService, public router: Router, private afStorage: AngularFireStorage, private titleService: Title) {
    //change page title
    this.titleService.setTitle("Calisthen-U | New Location");
  }

  availableEq: string[] = new Array();
  currentImages: string[] = new Array();
  data: any;
  online: boolean;

  value: string;

  equipmentList: string[] = new Array();

  ngOnInit(): void {

    //check if user has internet connection
    if (navigator.onLine) {
      this.online = true;
    }
    else {
      this.online = false;
    }
    window.addEventListener('online', () => this.online = true);
    window.addEventListener('offline', () => this.online = false);

    //init list of equipments
    this.equipmentList = [
      "Pull-up Bars",
      "Push-up Bars",
      "Parallel Bars",
      "Workout Desk",
      "Wall Bars",
      "Abs Benches",
      "Gym Rings",
      "Monkey Bars",
    ]
  }

  //when form submitted create new location by calling service which will add location into db, reset form, refresh list, log into console
  onSubmit() {
    if (this.authService.userData != undefined) {
      //all form values
      this.data = this.locService.form.value;

      //check if name is empty
      if (this.data.locationName == "" || this.data.locationName == null) {
        document.querySelector(".alertCoord").classList.remove("hide");
        setTimeout(() => {
          let alert = document.querySelector(".alertCoord");
          if (alert) {
            alert.classList.add("hide");
          }
        }, 4000);
        return
      }

      //for wathever reason angular's formControl won't take what's inside the coordinates input when filled in with javascript. SOLUTION: do it manually
      if (this.data.locationCoordinates == "" || this.data.locationCoordinates == null) {
        let coords = <HTMLInputElement>document.getElementById("coordinates");
        this.data.locationCoordinates = coords.value;
        if (this.data.locationCoordinates == "" || this.data.locationCoordinates == null) {
          document.querySelector(".alertCoord").classList.remove("hide");
          setTimeout(() => {
            let alert = document.querySelector(".alertCoord");
            if (alert) {
              alert.classList.add("hide");
            }
          }, 4000);
          return
        }
      }

      //manually add fields into data object (not through FormControl)
      this.data.equipments = this.availableEq;

      //when is location open
      if (this.data.locationAccess == null || this.data.locationAccess == '') {
        if (this.value == "limited") {
          this.data.locationAccess = "This location has restricted opening hours."
        }
        else {
          this.data.locationAccess = "This location is open 24/7."
        }
      }
      this.uploadImage();
      this.locService.form.reset();
    }
    else {
      window.alert("log in to add location")
    }
  }

  updateEqs(selected: any) {
    if (selected.target.checked) {
      this.availableEq.push(selected.target.value);
    } else {
      this.availableEq.splice(this.availableEq.indexOf(selected.target.value), 1);
    }
  }

  paths: Array<any> = []

  upload($event: any) {
    this.paths = $event.target.files
  }

  uploadImage() {
    let total = this.paths.length;
    let totalDone = 0;
    if (this.paths.length <= 0) {
      this.locService.CreateLocation(this.data).then(() => this.router.navigate(['dashboard']));
    }
    else {
      for (let i = 0; i < this.paths.length; i++) {
        this.afStorage.upload("Images/" + Math.random() + "-" + this.paths[i].name, this.paths[i]).then(res => {
          this.afStorage.storage.ref(res.metadata.fullPath).getDownloadURL().then(res => {
            this.currentImages.push(res);
            totalDone++;
            if (totalDone == total) {
              //current images toevoegen aan firestore...
              this.data.images = this.currentImages;

              let lat = this.data.locationCoordinates.split(',')[0]
              let lng = this.data.locationCoordinates.split(',')[1]
              fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyCYA3o-l43alSHU-MDnw9G-dWnd0DAQdZE')
                .then(response => response.json())
                .then(data => { this.data.fullAddress = data.results[0].formatted_address; })
                .then(() => this.locService.CreateLocation(this.data))
                .then(() => this.router.navigate(['dashboard']));
            }
          })
        })
      }
    }
  }
}
