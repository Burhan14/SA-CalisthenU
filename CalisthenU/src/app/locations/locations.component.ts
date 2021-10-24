import { Component, OnInit } from '@angular/core';
// import {MatListModule} from '@angular/material/list';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Locations { 
  name: string;
}

@Component({
  selector: 'app-locations',
  // templateUrl: './locations.component.html',
  template: `<mat-list role="list">
  <p *ngFor="let loc of locations">
    <mat-list-item role="listitem">{{loc.name}}</mat-list-item>
    <mat-divider></mat-divider>
  </p>
  
</mat-list>`,
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {
  locations: any;
  constructor(private db: AngularFirestore) {
    this.locations = db.collection('locations').valueChanges();
    this.locations.subscribe(console.table);

  // ngOnInit(): void {
  // }

  // }
}
}
