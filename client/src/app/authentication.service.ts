import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { UserDetails } from "shared/models/UserDetails";
import { TokenResponse } from "shared/models/token";
import { TokenPayload } from "shared/models/token";
import { ad } from "shared/models/ad";
import { city } from "shared/models/city";
import { location } from "shared/models/location";
import { image } from "shared/models/image";
import { customer } from "shared/models/customer";
import { email } from "shared/models/email";
import { fav } from "shared/models/fav";

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem("mean-token", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(
    method: "post" | "get",
    type:
      | "login"
      | "register"
      | "update_agent"
      | "profile"
      | "save_ad"
      | "get_ads"
      | "delete_ad"
      | "update_ad"
      | "delete_agent"
      | "save_city"
      | "get_cities"
      | "save_location"
      | "get_locations"
      | "get_city_locations"
      | "update_image"
      | "update_location"
      | "getAgents"
      | "get_customers"
      | "save_customer"
      | "send_email"
      | "update_fav"
      | "update_user"
      | "save_customerProperty"
      | "get_customerProperty",
    template?:
      | TokenPayload
      | ad
      | city
      | location
      | image
      | customer
      | email
      | fav
  ): Observable<any> {
    let base;
    const prod = false;

    if (method === "post") {
      base = this.http.post(`https://asasa.com/api/${type}`, template);
      if (prod) {
        base = this.http.post(`https://asasa.com/api/${type}`, template);
      }
    } else {
      base = this.http.get(`https://asasa.com/api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
      if (prod) {
        base = this.http.get(`https://asasa.com/api/${type}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` }
        });
      }
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (!data) {
          return;
        }
        if (data.token) {
          localStorage.setItem("customer-data", JSON.stringify(data.data));
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request("post", "register", user);
  }

  public updateUser(user): Observable<any> {
    return this.request("post", "update_user", user);
  }

  public updateAgent(user: TokenPayload): Observable<any> {
    return this.request("post", "update_agent", user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request("post", "login", user);
  }

  public profile(): Observable<any> {
    return this.request("get", "profile");
  }

  public updateFav(fav): Observable<any> {
    return this.request("post", "update_fav", fav);
  }

  public getAgents(): Observable<any> {
    return this.request("get", "getAgents");
  }

  public deleteAgent(agent): Observable<any> {
    return this.request("post", "delete_agent", agent);
  }

  public saveAd(ad): Observable<any> {
    return this.request("post", "save_ad", ad);
  }

  public saveCity(city): Observable<any> {
    return this.request("post", "save_city", city);
  }

  public saveLocation(location): Observable<any> {
    return this.request("post", "save_location", location);
  }

  public updateLocation(location): Observable<any> {
    return this.request("post", "update_location", location);
  }

  public getCityLocations(location): Observable<any> {
    return this.request("post", "get_city_locations", location);
  }

  public updateAd(ad): Observable<any> {
    return this.request("post", "update_ad", ad);
  }

  public getAds(): Observable<any> {
    return this.request("get", "get_ads");
  }

  public getCities(): Observable<any> {
    return this.request("get", "get_cities");
  }

  public getLocations(): Observable<any> {
    return this.request("get", "get_locations");
  }

  public deleteAd(ad): Observable<any> {
    return this.request("post", "delete_ad", ad);
  }

  public updateImage(image): Observable<any> {
    return this.request("post", "update_image", image);
  }

  public saveCustomer(customer): Observable<any> {
    return this.request("post", "save_customer", customer);
  }

  public getCustomers(): Observable<any> {
    return this.request("get", "get_customers");
  }

  public saveCustomerProperty(customerAd): Observable<any> {
    return this.request("post", "save_customerProperty", customerAd);
  }

  public getCustomersProperties(): Observable<any> {
    return this.request("get", "get_customerProperty");
  }

  public sendEmail(email): Observable<any> {
    return this.request("post", "send_email", email);
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("mean-token");
    this.router.navigateByUrl("/");
  }
}
