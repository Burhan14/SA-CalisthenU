import { Component, OnInit } from '@angular/core';
import { LocService } from 'src/app/shared/services/loc/loc.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(public locService: LocService) { }

  ngOnInit(): void {
  }

}
