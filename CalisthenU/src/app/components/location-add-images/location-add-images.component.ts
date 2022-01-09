import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { LocService } from 'src/app/shared/services/loc/loc.service';

@Component({
  selector: 'app-location-add-images',
  templateUrl: './location-add-images.component.html',
  styleUrls: ['./location-add-images.component.css']
})
export class LocationAddImagesComponent implements OnInit {

  constructor(private locService: LocService, private router: Router, private afStorage: AngularFireStorage, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.locId = params['id']
    })
    this.locService.GetLocationSingle(this.locId).subscribe(res => {
      this.thisLocation = res.payload.data();
      this.imagesFromDB = this.thisLocation.images;
    })
  }

  locId: string;
  data: any = {};
  currentImages: string[] = new Array();
  paths: Array<any> = []
  thisLocation: any;
  imagesFromDB: any;

  upload($event: any) {
    this.paths = $event.target.files
  }

  uploadImage() {

    if (this.paths.length <= 0) {
      this.router.navigate(['user-profile'])
    }
    else {
      let total = this.paths.length;
      let totalDone = 0;
      if (this.paths.length <= 0) {
        this.locService.CreateLocation(this.data).then(() => this.router.navigate(['dashboard']));
      }
      else {
        for (let i = 0; i < this.paths.length; i++) {
          this.afStorage.upload("Images/" + Math.random() + "-" + this.paths[i].name, this.paths[i]).then(res => {
            this.afStorage.storage.ref(res.metadata.fullPath).getDownloadURL().then(res => {
              this.currentImages.push(res);
              totalDone++;
              if (totalDone == total) {
                //current images toevoegen aan firestore...
                let allImages = [...this.currentImages, ...this.imagesFromDB]
                this.data.images = allImages;

                this.locService.UpdateLocation(this.locId, this.data).then(() => this.router.navigate(['user-profile']))

              }
            })
          })
        }
      }
    }

  }

}
