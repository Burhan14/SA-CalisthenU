import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../shared/services/auth/auth.service';
import { LocService } from 'src/app/shared/services/loc/loc.service';
import { Title } from '@angular/platform-browser';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{

  @ViewChild(MapComponent) child:MapComponent;

  constructor(public authService: AuthService, public locService: LocService, private titleService:Title) {
    //change page title
    this.titleService.setTitle("Calisthen-U");
  }
  currentUser:any = this.authService.userData;
  ngOnInit(): void {
    try {
      // console.log(this.currentUser);
      // this.child.GetLocations();
    } catch (error) {
      console.log(error)
    }
  }
 
}
