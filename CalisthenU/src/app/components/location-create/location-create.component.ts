import { Location } from 'src/app/shared/services/loc/location';
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

  constructor(public authService: AuthService, public locService: LocService, public router: Router, private afStorage: AngularFireStorage, private titleService:Title) {
    //change page title
    this.titleService.setTitle("Calisthen-U | New Location");
   }

  availableEx: string[] = new Array();
  currentImages: string[] = new Array();
  data: any;

  value: string;

  ngOnInit(): void {
  }

  //when form submitted create new location by calling service which will add location into db, reset form, refresh list, log into console
  onSubmit() {
    if (this.authService.userData != undefined) {
      //all form values
      this.data = this.locService.form.value;

      //for wathever reason angular's formControl won't take what's inside the coordinates input when filled in with javascript. SOLUTION: do it manually
      if (this.data.locationCoordinates == "" || this.data.locationCoordinates == null) {
        let coords = <HTMLInputElement>document.getElementById("coordinates");
        this.data.locationCoordinates = coords.value;
      }

      //manually add fields into data object (not through FormControl)
      this.data.exercises = this.availableEx;

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
      // console.log(this.data);
      this.locService.form.reset();    }
    else {
      window.alert("log in to add location")
    }
  }

  updateExs(selected:any){
    if (selected.target.checked) {
      console.log(selected.target.value + ' added');
      this.availableEx.push(selected.target.value);    
      console.log(this.availableEx);
    }else{
      console.log(selected.target.value + ' removed');  
      this.availableEx.splice(this.availableEx.indexOf(selected.target.value), 1);
      console.log(this.availableEx);
    }
  }

  paths: Array<any> = []

  upload($event: any) {
    this.paths = $event.target.files
  }

  uploadImage() {
    let total = this.paths.length;
    let totalDone = 0;
    for (let i = 0; i < this.paths.length; i++) {
      this.afStorage.upload("Images/" + Math.random() + "-" + this.paths[i].name, this.paths[i]).then(res => {
        // this.currentImages.push(res.metadata.fullPath);
        this.afStorage.storage.ref(res.metadata.fullPath).getDownloadURL().then(res => {
          // console.log("download url: "+res);
          this.currentImages.push(res);
          totalDone++;
          if (totalDone == total) {
            //current images toevoegen aan firestore...
            this.data.images = this.currentImages;

            let lat = this.data.locationCoordinates.split(',')[0]
            let lng = this.data.locationCoordinates.split(',')[1]
            fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyCYA3o-l43alSHU-MDnw9G-dWnd0DAQdZE')
            .then(response => response.json())
            .then(data => {this.data.fullAddress = data.results[0].formatted_address; })
            .then(()=> this.locService.CreateLocation(this.data))
            .then(()=>this.router.navigate(['dashboard']));

            // this.locService.CreateLocation(this.data);
            // console.log(this.data);
            
            
          }
        })
      })
    }
  }
}
