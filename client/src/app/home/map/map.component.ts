/// <reference types="@types/googlemaps" />
declare var klokantech: any;
import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;

  // initial position
  lat: number = 34.062059005117556;
  lng: number = 71.54871650000006;

  gesture = "greedy";

  // marker image
  icon = {
    url: "assets/images/blue_circle.svg",
    scaledSize: {
      width: 12,
      height: 12
    }
  };

  ads = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.getAds();
  }

  mapReady(map) {
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //     this.zoom = 15;
    //   });
    // }
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('Settings'));
    var mapBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(34.03589373, 71.40848471),
      new google.maps.LatLng(34.08513423, 71.48481756));
    this.addOverLay(map, mapBounds, "peshawar/dha");
  }

  onMouseOver(infoWindow, map) {
    if (map.lastOpen && map.lastOpen.isOpen) {
      map.lastOpen.close();
    }
    map.lastOpen = infoWindow;
    this.map = map;
    infoWindow.open();
  }

  onMouseOut() {
    if (this.map.lastOpen !== null) {
      this.map.lastOpen.close();
    }
  }

  getAds() {
    this.propertyService.getAds().subscribe(ads => {
      this.ads = ads;
    }, (err) => {
      console.error(err);
    });
  }

  getDemand(demand) {
    return this.propertyService.localeString(demand);
  }

  private addOverLay(map, mapBounds, imgLoc) {
    var mapMinZoom = 12;
    var mapMaxZoom = 17;
    var overlay = new klokantech.MapTilerMapType(map, function (x, y, z) {
      return "assets/map/" + imgLoc + "/{z}/{x}/{y}.png".replace('{z}', z).replace('{x}', x).replace('{y}', y);
    },
      mapBounds, mapMinZoom, mapMaxZoom);

    map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    var opacitycontrol = new klokantech.OpacityControl(map, overlay);
    map.fitBounds(mapBounds);
    map.setZoom(13);
  }



}
