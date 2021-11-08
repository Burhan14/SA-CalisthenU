import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-point-form',
  templateUrl: './map-point-form.component.html',
  styleUrls: ['./map-point-form.component.css']
})
export class MapPointFormComponent implements OnInit {

  name!: string;
  latitude!: number;
  longitude!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
