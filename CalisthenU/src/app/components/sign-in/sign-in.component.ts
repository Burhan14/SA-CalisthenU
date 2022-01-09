import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(public authService: AuthService, private titleService: Title) {
    //change page title
    this.titleService.setTitle("Calisthen-U | Sign-In");
  }

  ngOnInit() {

  }

}
