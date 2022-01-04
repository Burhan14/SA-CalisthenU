import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public authService: AuthService, private titleService:Title
  ) {
    //change page title
    this.titleService.setTitle("Calisthen-U | Verify-Email");
   }

  ngOnInit() {
  }

}