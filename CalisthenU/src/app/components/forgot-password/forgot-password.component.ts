import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  constructor(
    public authService: AuthService, private titleService: Title
  ) {
    //change page title
    this.titleService.setTitle("Calisthen-U | Forgot Password");
  }

  ngOnInit() {
  }

}