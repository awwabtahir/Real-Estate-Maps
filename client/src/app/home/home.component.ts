import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { ViewService } from "shared/services/view.service";
import { DOCUMENT } from "@angular/platform-browser";
import { PropertyService } from "shared/services/property.service";
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationEnd } from "@angular/router";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";

@Component({
  selector: "home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  innerWidth: number;
  view;
  firstVisit: boolean;
  isMobile: boolean;

  mapView = true;
  listView = false;
  mapSearchBar = false;
  start: boolean;
  num: number;
  sub;

  constructor(
    private viewService: ViewService,
    private service: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private slimScroll: SlimLoadingBarService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    this.slimScroll.progress = 20;
    this.slimScroll.start();
    this.sub = this.route.params.subscribe(params => {
      if (params.city) {
        this.service.firstVisit = false;
        this.firstVisit = false;
        this.mapSearchBar = true;
        this.start = false;
      }
    });
    this.firstVisit = this.service.firstVisit;
    if (!this.firstVisit) {
      this.mapSearchBar = true;
    }
    this.start = this.service.firstVisit;
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 600) {
      this.isMobile = true;
    }
    this.view = this.viewService.getView().subscribe(view => {
      if (view == "listview") {
        this.mapView = false;
        this.listView = true;
      } else {
        this.mapView = true;
        this.listView = false;
      }
    });
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  // @HostListener("window:scroll", [])
  // onWindowScroll() {
  //   if (this.service.firstVisit) {
  //     this.num = this.doc.documentElement.scrollTop;
  //     if (this.innerWidth > 600) {
  //       //previos was 640
  //       if (this.num > 565) {
  //         this.mapSearchBar = true;
  //       } else if (this.num < 565) {
  //         this.mapSearchBar = false;
  //       }
  //     }
  //     if (this.innerWidth < 600) {
  //       //previos was 420
  //       if (this.num > 345) {
  //         this.mapSearchBar = true;
  //       } else if (this.num < 345) {
  //         this.mapSearchBar = false;
  //       }
  //     }
  //   }
  // }

  search(scroll) {
    if (scroll == "mobile") {
      this.service.firstVisit = false;
      this.firstVisit = false;
      this.start = false;
    } else if (scroll == "scroll") {
      setTimeout(() => {
        this.service.firstVisit = false;
      }, 100);
      this.firstVisit = false;
      this.start = false;
      setTimeout(() => {
        let el = document.getElementById("mapSearch");
        let pos = el.style.position;
        let top = el.style.top;
        el.style.position = "relative";
        el.style.top = "-55px";
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.style.top = top;
        el.style.position = pos;
      }, 100);
    }
  }
}
