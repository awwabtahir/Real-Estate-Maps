import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  @Output() filterFire: EventEmitter<any> = new EventEmitter();

  ads;
  filteredAds;

  constructor() { }

  apply(filterOpts) {
    this.filterFire.emit(filterOpts);
  }

  getFilterOpts() {
    return this.filterFire;
  }

  applyFilter(ads, filterOpts) {

    if (filterOpts.type !== "") {
      ads = ads.filter(function (ad) {
        return ad.type == filterOpts.type;
      });
    }

    if (filterOpts.lowPrice !== 0) {
      ads = ads.filter(function (ad) {
        return ad.demand >= filterOpts.lowPrice;
      });
    }

    if (filterOpts.highPrice !== 0) {
      ads = ads.filter(function (ad) {
        return ad.demand <= filterOpts.highPrice;
      });
    }

    if (filterOpts.areaUnit !== "") {
      this.ads = ads;
      this.convertArea(ads, filterOpts.areaUnit);
      ads = this.applyAreaFilters(this.filteredAds, filterOpts);
    }

    return ads;
  }

  private convertArea(ads, areaUnit) {
    this.filteredAds = $.extend(true, [], ads);
    if (areaUnit == "sqft") {
      for (var i = 0; i < this.filteredAds.length; i++) {
        if (this.filteredAds[i].areaType == areaUnit) continue;
        if (this.filteredAds[i].areaType == "marla") this.filteredAds[i].area = this.filteredAds[i].area * 272;
        if (this.filteredAds[i].areaType == "kanal") this.filteredAds[i].area = this.filteredAds[i].area * 5445;
        this.filteredAds[i].areaType = "sqft";
      }
    }

    if (areaUnit == "marla") {
      for (var i = 0; i < this.filteredAds.length; i++) {
        if (this.filteredAds[i].areaType == areaUnit) continue;
        if (this.filteredAds[i].areaType == "sqft") this.filteredAds[i].area = this.filteredAds[i].area / 272;
        if (this.filteredAds[i].areaType == "kanal") this.filteredAds[i].area = this.filteredAds[i].area * 20;
        this.filteredAds[i].areaType = "marla";
      }
    }

    if (areaUnit == "kanal") {
      for (var i = 0; i < this.filteredAds.length; i++) {
        if (this.filteredAds[i].areaType == areaUnit) continue;
        if (this.filteredAds[i].areaType == "sqft") this.filteredAds[i].area = this.filteredAds[i].area / 5445;
        if (this.filteredAds[i].areaType == "marla") this.filteredAds[i].area = this.filteredAds[i].area / 20;
        this.filteredAds[i].areaType = "kanal";
      }
    }
  }

  private applyAreaFilters(filteredAds, filterOpts) {
    if (filterOpts.lowArea !== 0) {
      filteredAds = filteredAds.filter(function (ad) {
        return ad.area >= filterOpts.lowArea;
      });
    }

    if (filterOpts.highArea !== 0) {
      filteredAds = filteredAds.filter(function (ad) {
        return ad.area <= filterOpts.highArea;
      });
    }

    let filtered = [];
    for (var arr in this.ads) {
      for (var filter in filteredAds) {
        if (this.ads[arr]._id == filteredAds[filter]._id) {
          filtered.push(this.ads[arr]);
        }
      }
    }

    return filtered;

  }


}
