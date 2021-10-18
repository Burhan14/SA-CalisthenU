import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';


declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild("map")
  public mapElement!: ElementRef;

  @Input()
  public _apikey: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  public constructor() { }

  public ngOnInit() { }

  public ngAfterViewInit() {
      let platform = new H.service.Platform({
          "apikey": this._apikey
      });
      
      let defaultLayers = platform.createDefaultLayers();
      let map = new H.Map(
          this.mapElement.nativeElement,
          defaultLayers.vector.normal.map,
          {
              zoom: 10,
              center: { lat: this.lat, lng: this.lng },
              pixelRatio: window.devicePixelRatio || 1
          }
      );
  }
}