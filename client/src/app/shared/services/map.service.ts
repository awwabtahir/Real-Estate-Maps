/// <reference types="@types/googlemaps" />
declare var klokantech: any;
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  @Output() cityFire: EventEmitter<any> = new EventEmitter();
  @Output() locFire: EventEmitter<any> = new EventEmitter();

  mapBounds: any;
  mapMinZoom: any;
  mapMaxZoom: any;
  overlay: any;
  opacitycontrol: any;

  constructor() { }

  addOverLay(map, bounds, imgLoc, markerModal?) {
    this.mapBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(bounds.lat0, bounds.lng0),
      new google.maps.LatLng(bounds.lat1, bounds.lng1));
    this.mapMinZoom = 10;
    this.mapMaxZoom = 22;
    this.overlay = new klokantech.MapTilerMapType(map, function (x, y, z) {
      return "https://asasamaps.s3.amazonaws.com/map/" + imgLoc + "/{z}/{x}/{y}.png".replace('{z}', z).replace('{x}', x).replace('{y}', y);
    },
    this.mapBounds, this.mapMinZoom, this.mapMaxZoom);

    if(this.opacitycontrol) {
      $(".goog-slider-horizontal").remove();
    }
    this.opacitycontrol = new klokantech.OpacityControl(map, this.overlay);
    if(!markerModal) map.fitBounds(this.mapBounds);   
    map.setMapTypeId(google.maps.MapTypeId.HYBRID);

    if(markerModal) map.setZoom(16); 
    else map.setZoom(14); 
  }

  cityChange(city) {
    this.cityFire.emit(city);
  }

  getCity() {
    return this.cityFire;
  }

  locationChange(location) {
    this.locFire.emit(location);
  }

  getLocation() {
    return this.locFire;
  }

}