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

  constructor(public locService: LocService, private router: Router, private route: ActivatedRoute, private authService: AuthService, private titleService: Title) {
    //change page title
    this.titleService.setTitle("Calisthen-U | Update Location");
  }

  updatedData: any = new Object();;

  availableEq: string[] = new Array();
  value: string;
  id: string;
  private sub: any;
  location: any
  locName: string;
  locDescription: string;
  locCoordinates: string;
  locAccess: string;
  locEquipments: any;
  createdBy: string;
  fullAddress: string;
  authorId: string;
  equipmentList: string[] = new Array();

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.GetLocation();
    })

    //init list of equipments (if this list is going to be updated, dont forget to manually add selectors at line 133)
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

  GetLocation = () => {
    let loopCount = 0;
    this.locService
      .GetLocationSingle(this.id)
      .subscribe(res => {

        this.location = res.payload.data();
        this.locName = this.location.locationName;
        this.locDescription = this.location.locationDescription;
        this.locCoordinates = this.location.locationCoordinates;
        this.locAccess = this.location.locationAccess;
        this.locEquipments = this.location.equipments;
        this.createdBy = this.location.createdByDN;
        this.authorId = this.location.createdByUID;
        this.availableEq = this.locEquipments;

        if (loopCount < 1) {

          this.CheckBoxes();

          //if not author of this location => redirect to unauthorized page
          if (this.authorId != this.authService.userData.uid) this.router.navigate(["unauthorized"])
          
          loopCount++;
        }

      })
  }

  onSubmit() {
    if (this.authService.userData == undefined) return;
    let nameUpdate = <HTMLInputElement>document.getElementById('location');
    let coordsUpdate = <HTMLInputElement>document.getElementById('coordinates');
    let descrUpdate = <HTMLInputElement>document.getElementById('description');
    this.updatedData.equipments = this.availableEq;
    this.updatedData.locationCoordinates = coordsUpdate.value;
    this.updatedData.locationName = nameUpdate.value;
    this.updatedData.locationDescription = descrUpdate.value;
    this.updatedData.locationAccess = "This location is open 24/7."
    if (this.value === 'limited') {
      let accessUpdate = <HTMLInputElement>document.getElementById('accesibility');
      this.updatedData.locationAccess = accessUpdate.value;
    }

    this.locService.UpdateLocation(this.id, this.updatedData)
    this.router.navigate(["location-details", this.id]);
  }

  updateEqs(selected: any) {
    if (selected.target.checked) {
      this.availableEq.push(selected.target.value);
    } else {
      this.availableEq.splice(this.availableEq.indexOf(selected.target.value), 1);
    }
  }

  CheckBoxes() {
    let Pull = <HTMLInputElement>document.querySelector(".Pull-up");
    let Push = <HTMLInputElement>document.querySelector(".Push-up");
    let Parallel = <HTMLInputElement>document.querySelector(".Parallel");
    let Workout = <HTMLInputElement>document.querySelector(".Workout");
    let Wall = <HTMLInputElement>document.querySelector(".Wall");
    let Abs = <HTMLInputElement>document.querySelector(".Abs");
    let Gym = <HTMLInputElement>document.querySelector(".Gym");
    let Monkey = <HTMLInputElement>document.querySelector(".Monkey");

    for (let eq of this.availableEq) {
      if (eq == "Pull-up Bars") Pull.checked = true;
      if (eq == "Push-up Bars") Push.checked = true;
      if (eq == "Parallel Bars") Parallel.checked = true;
      if (eq == "Workout Desk") Workout.checked = true;
      if (eq == "Wall Bars") Wall.checked = true;
      if (eq == "Abs Benches") Abs.checked = true;
      if (eq == "Gym Rings") Gym.checked = true;
      if (eq == "Monkey Bars") Monkey.checked = true;
    }
  }
}
