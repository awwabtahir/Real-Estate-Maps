import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../authentication.service";
import { PropertyService } from "shared/services/property.service";

@Component({
  selector: "app-agents",
  templateUrl: "./agents.component.html",
  styleUrls: ["./agents.component.css"]
})
export class AgentsComponent implements OnInit {
  data: any;
  cities;
  ads;
  locations;
  public sortBy = "id";
  public sortOrder = "desc";

  constructor(
    private auth: AuthenticationService,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.getAgents();
    this.getLocations();
    this.getCities();
  }

  getAgents() {
    this.auth.getAgents().subscribe(
      data => {
        this.data = data.filter(function(d) {
          return d.access !== undefined;
        });
        this.getAds();
      },
      err => {
        console.error(err);
      }
    );
  }

  getCity(cityId) {
    let city = this.cities.filter(function(city) {
      return city._id == cityId;
    });
    if (city[0]) return city[0].city;
    else return "";
  }

  getLocation(locId) {
    let location = this.locations.filter(function(location) {
      return location._id == locId;
    });
    if (location[0]) return location[0].location;
    else return "";
  }

  getCities() {
    this.auth.getCities().subscribe(
      cities => {
        this.cities = cities;
      },
      err => {
        console.error(err);
      }
    );
  }

  getLocations() {
    this.auth.getLocations().subscribe(
      locations => {
        this.locations = locations;
      },
      err => {
        console.error(err);
      }
    );
  }

  itemfordelete;
  confirmDelete(item) {
    this.itemfordelete = item;
  }

  delete() {
    let index = this.data.indexOf(this.itemfordelete);
    if (index > -1) {
      this.data.splice(index, 1);
    }
    this.auth.deleteAgent(this.itemfordelete).subscribe(result => {
      console.log("success");
    });
  }

  getAds() {
    this.propertyService.getAds().subscribe(
      data => {
        this.ads = data;
        this.data.forEach((obj, index) => {
          let a = this.ads.filter(d => {
            return d.userId == obj._id;
          });
          this.data[index].propertyCount = a.length;
        });
      },
      err => {
        console.error(err);
      }
    );
  }
}
