import { ReviewService } from './../../shared/services/review/review.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() locId:string;


  constructor(private afStorage:AngularFireStorage, private reviewService: ReviewService ) { }
  currentRating: number = 1;
  data:any = new Object();

  review:any
  createdBy: string;
  comment: string;
  score:number;
  date:any;

  ngOnInit(): void {
    this.GetReviewsById();
  }

  public sendReview(comment: string) {
    this.data.rating = this.currentRating;
      if (!comment) {
        // console.log("NO COMMENT!" + this.currentRating);
        this.data.comment = null;
      }
      else{
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

  //call service to fetch data from db and push into reviews array
  // GetReviews = () =>
  //   this.reviewService
  //   .GetReviews()
  //   .subscribe(res => {
  //     this.reviews = res;
  //   });  

  //call service to fetch data from db and push into reviews array
    GetReviewsById = () =>
    this.reviewService
    .GetReviewById(this.locId)
    .subscribe(res => {
      this.review = res.payload.data();
      console.log(this.review);
      this.date = this.review.creationDate;
      this.score = this.review.rating;
      this.comment = this.review.comment;
      this.createdBy = this.review.createdByDN;
    });  

    // werkt niet
    // toon enkel de reviews waar de locid gelijk is aan de id van de huidige locatie.

}
