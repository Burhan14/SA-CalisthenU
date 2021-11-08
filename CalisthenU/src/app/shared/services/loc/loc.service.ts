import { Injectable, NgZone } from '@angular/core';
import { User } from "../auth/user";
import { Location } from "../loc/location";
// import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocService {
  locData: any; // Save logged in user data
  Locations: Location[];
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ){}

   //test: set data in firestore
   SetLocationData(locName: string) {
    const locRef: AngularFirestoreDocument<any> = this.afs.doc(`locations/test`);
    const locationData: Location = {
      name: locName
    };
    return locRef.set(locationData, {
      merge: true
    })
  }

   //test: set data in firestore
  GetLocations() {
    // const locRef: AngularFirestoreDocument<any> = this.afs.doc(`locations/test`);
    // console.log(this.afs.firestore.collectionGroup('locations'))

    // console.log(this.afs
    // .collection("locations")
    // .snapshotChanges().subscribe(res => {
    //   this.Locations = res.map( e => {
    //     return {
    //       name: e.payload.doc.data()
    //     } as Location;
    //   })
    // }));
        
  }
}
