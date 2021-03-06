import { AgmCoreModule } from "@agm/core";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "shared/shared.module";
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angular-6-social-login";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticationService } from "./authentication.service";
import { FooterComponent } from "./home/footer/footer.component";
import { LinksComponent } from "./home/footer/links/links.component";
import { HomeComponent } from "./home/home.component";
import { MapComponent } from "./home/map/map.component";
import { MarkerModalContentComponent } from "./home/map/marker-modal/marker-modal-content/marker-modal-content.component";
import { MarkerModalComponent } from "./home/map/marker-modal/marker-modal.component";
import { PhotoSliderComponent } from "./home/map/marker-modal/photo-slider/photo-slider.component";
import { MarkerComponent } from "./home/map/marker/marker.component";
import { PropertyComponent } from "./home/property/property.component";
import { SearchFilterComponent } from "./home/search-filter/search-filter.component";
import { SearchComponent } from "./home/search/search.component";
import { KeysPipe } from "./keys.pipe";
import { LoginComponent } from "./navbar/login/login.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RegisterComponent } from "./navbar/register/register.component";
import { SafeResourceUrlPipe } from "./safe-resource-url.pipe";
import { SocialLoginComponent } from "./home/social-login/social-login.component";
import { TermsComponent } from "./home/footer/terms/terms.component";
import { PrivacyComponent } from "./home/footer/privacy/privacy.component";
import { InfoWindowContentComponent } from "./home/map/marker/info-window-content/info-window-content.component";
import { EmailComponent } from "./home/email/email.component";
import { RegionsComponent } from "./home/regions/regions.component";
import { DashboardComponent } from "./admin/components/dashboard/dashboard.component";
import { SearchHomeComponent } from "./home/search-home/search-home.component";
import { HomeFeaturesComponent } from "./home/home-features/home-features.component";
import { HowWorksComponent } from "./home/how-works/how-works.component";
import { MobileSearchComponent } from "app/home/mobile-view-search/mobile-search.component";
import { AboutUsComponent } from "./home/about_us/about_us.component";
import { ContactUsComponent } from "./home/contact_us/contact_us.component";
import { HelpAndSupportComponent } from "./home/help_and_support/help_and_support.component";
import { ModalModule } from "ngx-bootstrap";
import { SlimLoadingBarModule } from "ng2-slim-loading-bar";
import { TextMaskModule } from "angular2-text-mask";
import { DataTablesModule } from "angular-datatables";
import { MatVideoModule } from "mat-video";
// Import angular-fusioncharts
import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as Charts from "fusioncharts/fusioncharts.charts";

import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("290889998216820")
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        "429038073436-skudu1ih2ioik7p7o5b1hq9p7u0rn8h5.apps.googleusercontent.com"
      )
    }
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SearchComponent,
    SearchHomeComponent,
    MobileSearchComponent,
    HomeFeaturesComponent,
    HowWorksComponent,
    MapComponent,
    PropertyComponent,
    FooterComponent,
    NavbarComponent,
    MarkerComponent,
    MarkerModalComponent,

    KeysPipe,
    SafeResourceUrlPipe,

    SearchFilterComponent,
    LinksComponent,
    SocialLoginComponent,
    TermsComponent,
    PrivacyComponent,
    InfoWindowContentComponent,

    RegionsComponent,
    AboutUsComponent,
    ContactUsComponent,
    HelpAndSupportComponent,
    MobileSearchComponent
  ],
  imports: [
    MatVideoModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    SlimLoadingBarModule.forRoot(),
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    SocialLoginModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCHA1nWRxqPxa86h3_FdsLdkEf-vJVkoU4",
      libraries: ["places"]
    }),
    TextMaskModule,
    DataTablesModule,
    FusionChartsModule
  ],
  providers: [
    AuthenticationService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
