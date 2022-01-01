import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    public db: AngularFirestore,   // Inject Firestore service
    public auth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public authService: AuthService
  ) { }

  CreateReview(data: any) {

    //add extra field to data to know who created the location (currently logged in user) and when it is created
    data.createdByUID = this.authService.userData.uid;
    data.createdByDN = this.authService.userData.displayName;
    data.creationDate = (new Date(Date.now())).toLocaleDateString();

    return new Promise<any>((resolve, reject) =>  {
      this.db.collection("reviews")
      .add(data)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    })
  }
  GetReviews(){
    return this.db.collection("reviews").snapshotChanges();
  }

}
