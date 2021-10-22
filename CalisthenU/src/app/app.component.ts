import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

export interface Item { 
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calisthen-U';

  constructor(private db: AngularFirestore) {
    const things = db.collection('items').valueChanges();
    things.subscribe(console.log);
}
}

// import { Component } from '@angular/core';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
// import { Observable } from 'rxjs';

// export interface Item { name: string; }

// @Component({
//   selector: 'app-root',
//   template: `
//     <div>
//       {{ (item | async)?.name }}
//     </div>
//   `
// })
// export class AppComponent {
//   private itemDoc: AngularFirestoreDocument<Item>;
//   item: Observable<Item>;
//   constructor(private afs: AngularFirestore) {
//     this.itemDoc = afs.doc<Item>('items/1');
//     this.item = this.itemDoc.valueChanges();
//   }
//   update(item: Item) {
//     this.itemDoc.update(item);
//   }
// }
