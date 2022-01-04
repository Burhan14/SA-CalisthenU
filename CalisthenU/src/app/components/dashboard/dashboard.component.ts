import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Map', cols: 3, rows: 1},
          { title: 'Locations', cols: 3, rows: 1, isLocationList: true  },
          // { title: 'Card 3', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Map', cols: 2, rows: 3 },
        { title: 'Locations', cols: 1, rows: 2, isLocationList: true  },
        { title: 'Location ...', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService, public locService: LocService, private titleService:Title) {
    //change page title
    this.titleService.setTitle("Calisthen-U");
  }
  currentUser:any = this.authService.userData;
  ngOnInit(): void {
    try {
      // console.log(this.currentUser);
    } catch (error) {
      console.log(error)
    }
  }
 
}
