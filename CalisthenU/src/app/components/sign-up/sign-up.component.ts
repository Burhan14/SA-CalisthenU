import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign-in/sign-in.component.css']
})

export class SignUpComponent implements OnInit {

  constructor(
    public authService: AuthService, private titleService:Title
  ) {
    //change page title
    this.titleService.setTitle("Calisthen-U | Sign-Up");
   }

  ngOnInit() { }

}