import { Component, OnInit, Input } from "@angular/core";

import { AdsService } from "shared/services/ads.service";

@Component({
  selector: "listview",
  templateUrl: "./listview.component.html",
  styleUrls: ["./listview.component.css"]
})
export class ListviewComponent implements OnInit {
  @Input() list;
  propertiesAvailable = false;
  properties;

  constructor(private adsService: AdsService) {}

  async ngOnInit() {
    this.adsService.filteredAdsChange.subscribe(res => {
      this.properties = res;
      this.getList(res);
    });
  }

  getAd(id) {
    let ad = this.properties.filter(function(p) {
      return p._id == id;
    });
    let ctx = { ad: ad[0] };
    return ctx;
  }

  getList(properties) {
    let result = properties.map(a => a._id);

    this.list = result;
    if (this.list.length == 0) {
      this.propertiesAvailable = false;
    } else this.propertiesAvailable = true;
  }
}
