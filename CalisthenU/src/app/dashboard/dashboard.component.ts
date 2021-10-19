import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
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

  constructor(private breakpointObserver: BreakpointObserver) {}
}
