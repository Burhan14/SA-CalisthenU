import { Location } from 'src/app/shared/services/loc/location';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  constructor(public authService: AuthService, public locService: LocService, public router: Router, private afStorage: AngularFireStorage) { }

  availableEx: string[] = new Array();
  currentImages: string[] = new Array();
  data: any;

  value: string;

  ngOnInit(): void {
  }

  // public addExercise(ex: string) {
  //   if (ex != "null" && !this.availableEx.includes(ex)) {
  //     this.availableEx.push(ex);
  //     console.log(this.availableEx);
  //   }
  // }

  // public removeEx(ex: string) {
  //   this.availableEx.splice(this.availableEx.indexOf(ex), 1);
  //   console.log(this.availableEx);
  // }

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

            this.locService.CreateLocation(this.data);
            // console.log(this.data);
            
            this.router.navigate(['dashboard']);
          }
        })
      })
    }
    
  }
}

// function readFiles() {

//   var buffer: any[] = new Array();
//   var files = (<HTMLInputElement>document.querySelector('input[type=file]')).files;

//   function readAndPush(file: any) {

//     if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
//       var reader = new FileReader();

//       reader.addEventListener("load", function () {
//         buffer.push(this.result)
//       }, false);

//       reader.readAsDataURL(file);
//     }

//   }

//   if (files) {
//     [].forEach.call(files, readAndPush);
//   }

//   return buffer;
// }
