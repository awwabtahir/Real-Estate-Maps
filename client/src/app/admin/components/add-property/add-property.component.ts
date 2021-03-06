import { Component, OnInit, OnDestroy } from "@angular/core";
import { PropertyService } from "shared/services/property.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../../authentication.service";
import { LocationService } from "shared/services/location.service";

@Component({
  selector: "add-property",
  templateUrl: "./add-property.component.html",
  styleUrls: ["./add-property.component.css"]
})
export class AddPropertyComponent implements OnInit, OnDestroy {
  ad = {
    userId: "",
    invId: "",
    type: "plot",
    subtype: "Residential Plot",
    propNumber: "",
    street: "",
    demand: "",
    area: "",
    areaType: "kanal",
    comment: "",
    title: "",
    description: "",
    vidUrl: "",
    purpose: "buy",
    locationData: {}
  };
  cities = [];
  locations = [];
  item;

  id: number;
  private sub: any;
  edit = false;

  user;
  agent = false;
  agentLocs;

  types = [
    { value: "buy", type: "Buy" },
    {
      value: "rent",
      type: "Rent"
    }
  ];
  selectedPurpose = "buy";

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService
  ) {}

  async ngOnInit() {
    await this.getCities();
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.access == "agent") this.agent = true;
    if (this.agent == true) {
      this.ad.userId = this.user.userId;
      this.selectedCity = this.user.cityId;
      await this.getLocations(this.selectedCity);
      // await new Promise((resolve, reject) => setTimeout(resolve, 1500));
    }
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  getCities() {
    let promise = new Promise((resolve, reject) => {
      this.auth.getCities().subscribe(
        cities => {
          this.cities = cities;

          this.city = this.cities.filter(city => {
            return city._id == this.user.cityId;
          });

          this.city = this.city[0];

          resolve("done");
        },
        err => {
          console.error("Error", err);
          reject(new Error("…"));
        }
      );
    }).then(async () => {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params["id"];

        if (this.id && this.propertyService.getItemforUpdate()) {
          this.item = this.propertyService.getItemforUpdate();
          this.setPage(this.item);
          if (this.item.imagesData !== undefined)
            this.propertyService.addImagesData(this.item.imagesData);
        } else {
          this.item = this.ad;
        }
      });
    });
  }

  async getLocations(selectedCity) {
    await this.auth.getLocations().subscribe(
      locations => {
        this.locations = locations.filter(function(loc) {
          return loc.cityId == selectedCity;
        });

        //Set Page to Edit
        if (this.item && this.propertyService.getItemforUpdate()) {
          let location = this.locations.filter(location => {
            return location.location == this.item.locationData.location;
          });
          if (location) {
            this.selectedLoc = location[0]._id;
            this.locationChange();
            this.setitem(this.item);
            this.edit = true;
          }
        }
        if (this.agent == true) {
          this.agentLocs = this.user.locationId;
          this.city = this.cities.filter(city => {
            return city._id == selectedCity;
          });

          this.city = this.city[0];

          this.filterLocations(this.agentLocs);
        }
      },
      err => {
        console.error("Error", err);
      }
    );
  }

  selectedCity;
  city: any;
  cityChange() {
    let selectedCity = this.selectedCity;
    this.getLocations(selectedCity);
    this.city = this.cities.filter(function(city) {
      return city._id == selectedCity;
    });
    this.city = this.city[0];

    this.selectedLoc = null;
  }

  selectedLoc;
  location: any;
  locationChange() {
    let selectedLoc = this.selectedLoc;
    this.location = this.locations.filter(function(location) {
      return location._id == selectedLoc;
    });
    this.location = this.location[0];
  }

  filtered;
  filterLocations(agentLocs) {
    this.filtered = [];
    for (var arr in this.locations) {
      for (var filter in agentLocs) {
        if (this.locations[arr].location == agentLocs[filter]) {
          this.filtered.push(this.locations[arr]);
        }
      }
    }
    this.locations = this.filtered;
  }

  save(uploadMedia) {
    this.propertyService.save(this.ad);

    this.uploadMedia = uploadMedia;
    if (!uploadMedia) this.router.navigateByUrl("/dashboard/activeProperties");
  }

  image3dUrl;
  async update(uploadMedia) {
    await new Promise((resolve, reject) => setTimeout(resolve, 1500));

    this.ad.locationData = this.locationData;
    this.propertyService.update(this.ad);
    this.uploadMedia = uploadMedia;
    if (this.item.imagesData !== undefined) {
      if (this.item.imagesData.image3d !== undefined) {
        this.image3dUrl = this.item.imagesData.image3d.url;
      }
    }
    if (!uploadMedia) this.router.navigateByUrl("/dashboard/activeProperties");
  }

  uploadMedia = false;
  uploadMediaClicked = true;
  updateMedia() {
    console.log("hello");
    this.uploadMediaClicked = false;
    this.propertyService.updateMedia(this.ad);
  }

  onImgUpload(event) {
    if (event.isStored) {
    }
  }

  purposeChange(e) {
    this.ad.purpose = e.value;
  }
  private async setPage(item) {
    let city = this.cities.filter(function(city) {
      return city.city == item.locationData.city;
    });
    this.selectedCity = city[0]._id;
    await this.getLocations(this.selectedCity);
  }
  locationData: any;
  private setitem(item) {
    let promise = new Promise((resolve, reject) => {
      this.ad["_id"] = item._id;
      this.ad.userId = item.userId;
      this.ad.invId = item.invId;
      this.ad.type = item.type;
      this.ad.subtype = item.subtype;
      this.ad.propNumber = item.propNumber;
      this.ad.street = item.street;
      this.ad.demand = item.demand;
      this.ad.area = item.area;
      this.ad.areaType = item.areaType;
      this.ad.comment = item.comment;
      this.ad.title = item.title;
      this.ad.description = item.description;
      this.ad.vidUrl = item.vidUrl;
      this.selectedPurpose = item.purpose;
      this.locationData = item.locationData;
      this.ad.locationData = item.locationData;

      this.city = this.cities.filter(city => {
        return city.city == this.ad.locationData["city"];
      });
      resolve("done");

      reject(new Error("…"));
    });
  }
}
