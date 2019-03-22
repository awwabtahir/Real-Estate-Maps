import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinksComponent } from './home/footer/links/links.component';
import { HomeComponent } from './home/home.component';
import { MarkerModalContentComponent } from './home/map/marker-modal/marker-modal-content/marker-modal-content.component';
import { LoginComponent } from './navbar/login/login.component';
import { RegisterComponent } from './navbar/register/register.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { TermsComponent } from './home/footer/terms/terms.component';
import { PrivacyComponent } from './home/footer/privacy/privacy.component';
import { MapHomeComponent } from './home/map-home/map-home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'links', component: LinksComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'privacy-policy', component: PrivacyComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuardService] },
    { path: 'editAgent/:id', component: RegisterComponent, canActivate: [AuthGuardService] },
    { path: 'property-details/:id', component: MarkerModalContentComponent },
    {
        path: "dashboard",
        loadChildren: "../app/admin/admin.module#AdminModule"
    },
    { path: 'map', component: MapHomeComponent },
    { path: 'map/:city', component: MapHomeComponent },
    { path: 'map/:city/:location', component: MapHomeComponent },
    { path: 'map/:city/:location/:type/:id', component: MarkerModalContentComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }