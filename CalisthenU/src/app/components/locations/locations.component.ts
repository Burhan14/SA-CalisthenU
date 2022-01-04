import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';
import { Location } from 'src/app/shared/services/loc/location';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  constructor(public locService: LocService, public authService: AuthService, private afStorage: AngularFireStorage) { }
  
  //when component initiated => get locations from db to list them inside card
  ngOnInit(): void {
    this.GetLocations();
    // setTimeout(() => {this.TestImages()}, 2000);
  }

  //array of locations, filled in directly on init from db
  locations: any = [];
  avgrating: number;
  //call service to fetch data from db and push into locations array
  GetLocations = () =>
    this.locService
    .GetLocations()
    .subscribe(res => {
      this.locations = res; 
      // let root = document.documentElement;
      // root.style.setProperty('--value', this.avgrating.toString());
    });  
  
  // GetUser(id:any){
  //   this.locService
  //   .GetUser(id)
  //   .subscribe(res => {console.log(res.payload.data())});  
  // }
  
  showInConsole(data:any){
    console.log(data);
    
  }



  // TestImages(){
  //   console.log('test');

  //   document.querySelector('.closeArea').addEventListener('click',() => {
  //     document.getElementById('modal').classList.add('d-none');

  //   });

  //   document.querySelectorAll('.images').forEach((img) =>{
  //     console.log();
      
  //     img.addEventListener('click', (e) =>{
  //       var image = (<HTMLImageElement>e.target);
  //       console.log(image.src);
  //       (<HTMLImageElement>document.querySelector('#slider_img')).src = image.src
  //       document.getElementById('modal').classList.remove('d-none');
  //     })
  //   })
  // }


}



