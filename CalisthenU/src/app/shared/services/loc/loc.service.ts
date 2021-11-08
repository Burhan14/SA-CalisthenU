import { Injectable, NgZone } from '@angular/core';
import { User } from "../auth/user";
import { Location } from "../loc/location";
// import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class LocService {
  locData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ){}

   //test firestore
   SetLocationData(locName: string) {
    const locRef: AngularFirestoreDocument<any> = this.afs.doc(`locations/test`);
    const locationData: Location = {
      name: locName
    };
    return locRef.set(locationData, {
      merge: true
    })
  }
}
