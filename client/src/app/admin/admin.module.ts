import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { DataTableModule } from "angular-6-datatable";
import { NgxEditorModule } from "ngx-editor";
import { FilePondModule } from "ngx-filepond";

import { AdminRoutingModule } from "./admin-routing.module";
import { ActivePropertiesComponent } from "./components/active-properties/active-properties.component";
import { AddCityComponent } from "./components/add-city/add-city.component";
import { AddLocationComponent } from "./components/add-location/add-location.component";
import { AddPropertyLocationComponent } from "./components/add-property/add-property-location/add-property-location.component";
import { AddPropertyBizCommComponent } from "./components/add-property/add-property-modal/add-property-biz-comm/add-property-biz-comm.component";
import { AddPropertyFeaturesComponent } from "./components/add-property/add-property-modal/add-property-features/add-property-features.component";
import { AddPropertyHealthcareComponent } from "./components/add-property/add-property-modal/add-property-healthcare/add-property-healthcare.component";
import { AddPropertyModalComponent } from "./components/add-property/add-property-modal/add-property-modal.component";
import { AddPropertyNearbyLocComponent } from "./components/add-property/add-property-modal/add-property-nearby-loc/add-property-nearby-loc.component";
import { AddPropertyOtherComponent } from "./components/add-property/add-property-modal/add-property-other/add-property-other.component";
import { AddPropertyPlotFeaturesComponent } from "./components/add-property/add-property-modal/add-property-plot-features/add-property-plot-features.component";
import { AddPropertyRoomsComponent } from "./components/add-property/add-property-modal/add-property-rooms/add-property-rooms.component";
import { AddPropertyComponent } from "./components/add-property/add-property.component";
import { UploadImage3dComponent } from "./components/add-property/upload-image3d/upload-image3d.component";
import { UploadImagesComponent } from "./components/add-property/upload-images/upload-images.component";
import { AddSublocationComponent } from "./components/add-sublocation/add-sublocation.component";
import { AgentsComponent } from "./components/agents/agents.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EditCityLocComponent } from "./components/edit-city-loc/edit-city-loc.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { GDriveComponent } from "./components/g-drive/g-drive.component";
import { FavouritesComponent } from "./components/favourites/favourites.component";
import { SharedModule } from "shared/shared.module";
import {
  NbThemeModule,
  NbSidebarModule,
  NbSidebarService,
  NbLayoutModule,
  NbMenuModule
} from "@nebular/theme";
import { DataTablesModule } from "angular-datatables";
import { FilterPipe } from "app/filter.pipe";
import { PropertyRequestComponent } from "./components/property-request/property-request.component";
// Import angular-fusioncharts
import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as Charts from "fusioncharts/fusioncharts.charts";

import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);
@NgModule({
  imports: [
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule,
    NbThemeModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    NgSelectModule,
    NgxEditorModule,
    FilePondModule,
    SharedModule,
    DataTablesModule,
    AdminRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCHA1nWRxqPxa86h3_FdsLdkEf-vJVkoU4",
      libraries: ["places"]
    }),
    FusionChartsModule
  ],
  declarations: [
    ProfileComponent,
    ActivePropertiesComponent,
    DashboardComponent,
    AddCityComponent,
    AddLocationComponent,
    AddPropertyComponent,
    AddPropertyFeaturesComponent,
    AddPropertyLocationComponent,
    AddPropertyModalComponent,
    AddPropertyBizCommComponent,
    AddPropertyNearbyLocComponent,
    AddPropertyRoomsComponent,
    AddPropertyHealthcareComponent,
    AddPropertyOtherComponent,
    AddPropertyPlotFeaturesComponent,
    UploadImage3dComponent,
    UploadImagesComponent,
    AddSublocationComponent,
    AgentsComponent,
    EditCityLocComponent,
    GDriveComponent,
    FavouritesComponent,
    FilterPipe,
    PropertyRequestComponent
  ],
  providers: [NbSidebarService]
})
export class AdminModule {}
