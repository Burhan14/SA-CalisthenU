import { ReviewService } from './../../shared/services/review/review.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(private afStorage:AngularFireStorage, private reviewService: ReviewService ) { }
  currentRating: number = 1;
  data:any = new Object();
  ngOnInit(): void {
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
      this.reviewService.CreateReview(this.data)
      // console.log(this.data);

  }

  public UpdateRating(rating: number) {
    this.currentRating = rating;
  }
}
