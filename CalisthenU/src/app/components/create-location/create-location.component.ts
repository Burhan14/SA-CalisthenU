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

  availableEx : string[] = new Array();
  // imagesBuffer : any[] = new Array();

  ngOnInit(): void {
  }

  public addExercise(ex:string){
    if (ex != "null" && !this.availableEx.includes(ex)) {
      this.availableEx.push(ex);
      console.log(this.availableEx);
    }
  }

  public removeEx(ex:string){
    this.availableEx.splice(this.availableEx.indexOf(ex),1);
    console.log(this.availableEx);
  }

  //when form submitted create new location by calling service which will add location into db, reset form, refresh list, log into console
  onSubmit() {
    // this.locService.form.value.locationName = this.locations;
    if (this.authService.userData != undefined) {
      let data = this.locService.form.value;
      //manually add fields into data object (not through FormControl)
      data.images = readFiles()
      data.exercises = this.availableEx;
      console.log(data);
      this.locService.CreateLocation(data);
      this.locService.form.reset();
      this.router.navigate(['dashboard']);
    }
    else{
      window.alert("log in to add location")
    }
  }
}

function readFiles() {

  var buffer : any[] = new Array();
  var files   =(<HTMLInputElement>document.querySelector('input[type=file]')).files;
  
  function readAndPush(file: any) {

    // Veillez à ce que `file.name` corresponde à nos critères d’extension
    if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        buffer.push(this.result)
      }, false);

      reader.readAsDataURL(file);
    }

  }

  if (files) {
    [].forEach.call(files, readAndPush);
  }

  return buffer;
}
