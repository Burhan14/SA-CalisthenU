import { LocService } from './../../shared/services/loc/loc.service';
import { ReviewService } from './../../shared/services/review/review.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() locId: string;


  constructor(private afStorage: AngularFireStorage, private reviewService: ReviewService, private locService: LocService) { }
  currentRating: number = 1;
  data: any = new Object();

  ngOnInit(): void {
    this.reviewsRaw = []
    this.reviews = []
    this.GetReviews();
  }

  public sendReview(comment: string) {
    this.data.rating = this.currentRating;
    if (!comment) {
      // console.log("NO COMMENT!" + this.currentRating);
      this.data.comment = null;
    }
    else {
      // console.log(comment + " " + this.currentRating);
      this.data.comment = comment;
    }
    this.data.locId = this.locId;
    this.reviewService.CreateReview(this.data)
    // console.log(this.data);
  }

  public UpdateRating(rating: number) {
    this.currentRating = rating;
  }

  //array of reviews, filled in directly on init from db
  reviews: any = [];
  reviewsRaw: any = [];
  locationId: any;

  //call service to fetch data from db and push into reviews array
  GetReviews = () => {
    let loopCount = 0;
    this.reviewService
      .GetReviews()
      .subscribe(res => {
        if (loopCount < 1) {
          this.reviewsRaw = res;
          for (let rev of this.reviewsRaw) {
            if (rev.payload.doc.data().locId == this.locId) {
              this.reviews.push(rev);
              console.log(this.reviews);
            }
          }
          loopCount++;
        };
      });
  }

}
