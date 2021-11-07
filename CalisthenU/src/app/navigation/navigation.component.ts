import { Component, OnChanges, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnChanges {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn: boolean = false;
  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService, public router: Router) {

  }

  goToProfile(): void{
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
