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

  value: string;

  ngOnInit(): void {
  }

  public addExercise(ex: string) {
    if (ex != "null" && !this.availableEx.includes(ex)) {
      this.availableEx.push(ex);
      console.log(this.availableEx);
    }
  }

  public removeEx(ex: string) {
    this.availableEx.splice(this.availableEx.indexOf(ex), 1);
    console.log(this.availableEx);
  }

  //when form submitted create new location by calling service which will add location into db, reset form, refresh list, log into console
  onSubmit() {
    if (this.authService.userData != undefined) {
      //all form values
      let data = this.locService.form.value;

      //manually add fields into data object (not through FormControl)
      data.exercises = this.availableEx;

      //save image file names (they will be uploaded afterwards)
      // for (let i = 0; i < this.paths.length; i++) {
      //   // this.currentImages.push("Images/" + [ID OF CURRENT DOCUMENT] + i)
        
      // }
      // data.images = this.currentImages;

      //when is location open
      if (data.locationAccess == null || data.locationAccess == '') {
        if (this.value == "limited") {
          data.locationAccess = "This location has restricted opening hours."
        }
        else {
          data.locationAccess = "This location is open 24/7."
        }
      }
      console.log(data);
      this.locService.CreateLocation(data)
      // .then(res => {this.uploadImage(res.id);});
      // this.locService.form.reset();
      this.router.navigate(['dashboard']);


    }
    else {
      window.alert("log in to add location")
    }
  }

  paths: Array<any> = []

  upload($event: any) {
    this.paths = $event.target.files
  }

  uploadImage(locId: string) {
    for (let i = 0; i < this.paths.length; i++) {
      this.afStorage.upload("Images/" + locId + "-" + i, this.paths[i]).then(res => {
        // this.currentImages.push(res.metadata.fullPath);
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
