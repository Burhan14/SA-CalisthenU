import { Component, OnChanges } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnChanges {

  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, public router: Router) { }

  goToProfile(): void {
    if (this.authService.userData != undefined) {
      this.router.navigate(['user-profile']);
    } else {
      this.router.navigate(['sign-in']);
    }
  }

  ngOnChanges(): void {
    if (this.authService.userData != undefined) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
