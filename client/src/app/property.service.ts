import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  locationData = {};
  features = {};
  plot_features = {};
  rooms = {};
  biz_comm = {};
  healthcare = {};
  nearby_loc = {};
  other = {};

  constructor() { }

  save(ad) {
    ad["locationData"] = this.locationData;
    if(ad.type != 'plot') ad["features"] = this.features;
    if(ad.type == 'plot') ad["plot_features"] = this.plot_features;
    ad["rooms"] = this.rooms;
    ad["biz_comm"] = this.biz_comm;
    ad["healthcare"] = this.healthcare;
    ad["nearby_loc"] = this.nearby_loc;
    ad["other"] = this.other;
    console.log(ad);
  }

  addLocation(data) {
    this.locationData = data;
  }

  addFeatures(features) {
    this.features = features;
  }

  addPlotFeatures(plot_features) {
    this.plot_features = plot_features;
  }

  addRooms(rooms) {
    this.rooms = rooms;
  }

  addBizComm(biz_comm) {
    this.biz_comm = biz_comm;
  }

  addHealthCare(healthcare) {
    this.healthcare = healthcare;
  }

  addNearByLoc(nearby_loc) {
    this.nearby_loc = nearby_loc;
  }

  addOther(other) {
    this.other = other;
  }

}
