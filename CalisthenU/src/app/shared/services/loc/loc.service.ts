import { Injectable, NgZone } from '@angular/core';
import { User } from "../auth/user";
import { Location } from "../loc/location";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { textChangeRangeIsUnchanged } from 'typescript';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocService {
  
  constructor(
    public db: AngularFirestore,   // Inject Firestore service
    public auth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public authService: AuthService
  ){ }

  //form to create a new location
  form = new FormGroup({
    locationName: new FormControl(''),
    locationCoordinates: new FormControl(''),
    locationDescription: new FormControl(''),
    locationAccess: new FormControl(''),
  })

  GetLocations(){
    return this.db.collection("locations").snapshotChanges();
  }

  GetLocationSingle(id: string){
    // console.log(id);
    return this.db.collection("locations").doc(id).snapshotChanges();
  }

  GetUser(id:any){
    return this.db.collection("users").doc(id).snapshotChanges();
  }

  CreateLocation(data: any) {

    //add extra field to data to know who created the location (currently logged in user) and when it is created
    data.createdByUID = this.authService.userData.uid;
    data.createdByDN = this.authService.userData.displayName;
    data.creationDate = Date.now();

    return new Promise<any>((resolve, reject) =>  {
      this.db.collection("locations")
      .add(data)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    })
  }

  DeleteLocation(docId: string){
    return this.db
       .collection("locations")
       .doc(docId)
       .delete();
  }
  UpdateLocation(docId: string, data: any){
    return this.db
       .collection("locations")
       .doc(docId)
       .update(data);
  }
}
