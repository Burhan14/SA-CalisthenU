import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocService } from 'src/app/shared/services/loc/loc.service';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {

  constructor(public locService: LocService) {
    
  }

  
}

