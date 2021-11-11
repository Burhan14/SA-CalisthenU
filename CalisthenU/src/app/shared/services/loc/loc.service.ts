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
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LocService {
  
  constructor(
    public db: AngularFirestore,   // Inject Firestore service
    public auth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ){ }

  //form to create a new location
  form = new FormGroup({
    locationName: new FormControl(''),
  })

  GetLocations(){
    return this.db.collection("locations").snapshotChanges();
  }

   //test: set data in firestore
   SetLocationData(locName: string) {
    const locRef: AngularFirestoreDocument<any> = this.db.doc(`locations/test`);
    const locationData: Location = {
      name: locName
    };
    return locRef.set(locationData, {
      merge: true
    })
  }

  CreateLocation(data: any) {
    return new Promise<any>((resolve, reject) =>  {
      this.db.collection("locations")
      .add(data)
      .then(res => {}, err => reject(err));
    })
  }
}
