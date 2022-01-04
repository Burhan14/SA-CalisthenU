import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  constructor(public locService: LocService, private router: Router,private route:ActivatedRoute, private authService: AuthService, private titleService:Title) {
    //change page title
    this.titleService.setTitle("Calisthen-U | Update Location");
  }

  updatedData: any = new Object();;

  availableEx: string[] = new Array();
  value: string;
  id:string;
  private sub: any;
  location:any
  locName:string;
  locDescription:string;
  locCoordinates:string;
  locAccess:string;
  locExercises:any;
  createdBy:string;
  fullAddress: string;
  authorId: string;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.GetLocation();
    })
  }

  GetLocation = () => {
    let loopCount= 0;
    this.locService
    .GetLocationSingle(this.id)
    .subscribe(res => {

      this.location = res.payload.data();
      this.locName = this.location.locationName;
      this.locDescription = this.location.locationDescription;
      this.locCoordinates = this.location.locationCoordinates;
      this.locAccess = this.location.locationAccess;
      this.locExercises = this.location.exercises;
      this.createdBy = this.location.createdByDN;
      this.authorId = this.location.createdByUID;

      this.availableEx = this.locExercises;

      // console.log(this.locName)

      
      if(loopCount < 1){
        
        this.CheckBoxes();
        if (this.authorId == this.authService.userData.uid) {
          // console.log("correct user");
        } else {
          // console.log("wrong user");
          this.router.navigate(["unauthorized"]);
        }
        loopCount++;
      }

    })
  }

  onSubmit() {
    if (this.authService.userData == undefined) return;
    let nameUpdate = <HTMLInputElement>document.getElementById('location');
    let coordsUpdate = <HTMLInputElement>document.getElementById('coordinates');
    let descrUpdate = <HTMLInputElement>document.getElementById('description');
    this.updatedData.exercises = this.availableEx;
    this.updatedData.locationCoordinates = coordsUpdate.value;
    this.updatedData.locationName = nameUpdate.value;
    this.updatedData.locationDescription = descrUpdate.value;
    this.updatedData.locationAccess = "This location is open 24/7."
    if (this.value === 'limited') {
      let accessUpdate = <HTMLInputElement>document.getElementById('accesibility');
      this.updatedData.locationAccess = accessUpdate.value;
    }

    // console.log(this.updatedData);
    this.locService.UpdateLocation(this.id, this.updatedData)
    this.router.navigate(["location-details", this.id]);
  }

  updateExs(selected:any){
    if (selected.target.checked) {
      // console.log(selected.target.value + ' added');
      this.availableEx.push(selected.target.value);    
      // console.log(this.availableEx);
    }else{
      // console.log(selected.target.value + ' removed');  
      this.availableEx.splice(this.availableEx.indexOf(selected.target.value), 1);
      // console.log(this.availableEx);
    }
  }

  CheckBoxes(){
    let leg = <HTMLInputElement>document.getElementById('Leg');
    let wipers = <HTMLInputElement>document.getElementById('Wipers');
    let flag = <HTMLInputElement>document.getElementById('Flag');
    let lever = <HTMLInputElement>document.getElementById('Lever');
    let l = <HTMLInputElement>document.getElementById('L');
    let dips = <HTMLInputElement>document.getElementById('Dips');
    let incline = <HTMLInputElement>document.getElementById('Incline');
    let australian = <HTMLInputElement>document.getElementById('Australian');
    let chin = <HTMLInputElement>document.getElementById('Chin');
    let pull = <HTMLInputElement>document.getElementById('Pull');

    
    // console.log(this.availableEx)

    for (let ex of this.locExercises) {
      if (ex == "Leg Exercises") leg.checked=true;
      if (ex == "Windshield Wipers") wipers.checked=true;
      if (ex == "Flag") flag.checked=true;
      if (ex == "Front-Lever") lever.checked=true;
      if (ex == "L-Sit") l.checked=true;
      if (ex == "Dips") dips.checked=true;
      if (ex == "Incline Push-up") incline.checked=true;
      if (ex == "Australian Pull-up") australian.checked=true;
      if (ex == "Chin-up") chin.checked=true;
      if (ex == "Pull-up") pull.checked=true;
    }
      
  }
}
