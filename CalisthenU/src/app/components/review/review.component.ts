import { ReviewService } from './../../shared/services/review/review.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() locId: string;

  constructor(private afStorage: AngularFireStorage, private reviewService: ReviewService, public authService: AuthService, public locService: LocService ) { }
  currentRating: number = 1;
  data: any = new Object();

  ngOnInit(): void {
    this.reviewsRaw = []
    this.reviews = []
    this.GetReviews();
  }

  public sendReview(comment: string) {
    if(this.authService.userData == undefined) return
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
    this.reviewsRaw = []
    this.reviews = []
    this.GetReviews();
  }

  public UpdateRating(rating: number) {
    this.currentRating = rating;
  }

  //array of reviews, filled in directly on init from db
  reviews: any = [];
  reviewsRaw: any = [];

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
            }
          }
          this.AvgRating();
          loopCount++;
        };
      });
  }

  score:number;
  //calculates the avg rating of all reviews
  AvgRating = () => {
    this.score = 0;
    for (let rev of this.reviews) {
      this.score = this.score + rev.payload.doc.data().rating;
    }
    if (this.reviews.length == 0) {
      this.score = 0;
    }else{
      this.score = this.score/this.reviews.length;
    }
    // console.log(this.score + '('+this.reviews.length+')');

    this.locService.UpdateLocation(this.locId, {avgRating: this.score})

  }

  RemoveComment(id: string){
    this.reviewService
    .DeleteReview(id).then(res => {
      this.reviewsRaw = [];
      this.reviews = [];
      this.GetReviews();
    });
  }
}

