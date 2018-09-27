import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  cities = [];
  locations = [];

  constructor(private auth: AuthenticationService,
    private mapService: MapService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.auth.getCities().subscribe(cities => {
      this.cities = cities;
    }, (err) => {
      console.error(err);
    });
  }

  cityChange(cityObj) {
    let cityId = cityObj._id;
    let cityData = this.cities.filter(function(city){
      return city._id == cityId;
    });
    this.mapService.cityChange(cityData[0]);
    this.locations = [];
    this.getLocations(cityId);
  }

  getLocations(selectedCity) {
    this.auth.getLocations().subscribe(locations => { 
      this.locations = locations.filter(function(loc){
        return loc.cityId == selectedCity;
      });
    }, (err) => {
      console.error(err);
    });
  }

  locationChange(locObj) {
    let locId = locObj._id;
    let locData = this.locations.filter(function(loc){
      return loc._id == locId;
    });
    this.mapService.locationChange(locData[0]);
  }

}
