import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PropertyService } from '../../../property.service';

@Component({
  selector: 'add-property-features',
  templateUrl: './add-property-features.component.html',
  styleUrls: ['./add-property-features.component.css']
})
export class AddPropertyFeaturesComponent implements OnInit, OnDestroy {
  
  @ViewChild('form') ngForm: NgForm;
  @Input() type: string;
  formChangesSubscription: Subscription;

  features = {
    builtyear: "",
    view: "",
    parking_space: "",
    window: false,
    cac: false,
    ch: false,
    waste_disposal: false,
    flooring: "",
    electric_backup: "",
    floors: "",
    other_features: "",
    furnished: false,
    lobby: false,
    building_floor: "",
    elevators: "",
    service_elevators: false
  }

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(features => {
      this.propertyService.addFeatures(features);
    });
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

}
