import { Component, OnInit } from "@angular/core";
import {
  OidcClientNotification,
  OidcSecurityService,
  PublicConfiguration,
} from "angular-auth-oidc-client";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "ng-auth-implicit-flow";

  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe((auth) => {
      console.log("is authenticated: ", auth);
      const token = this.oidcSecurityService.getToken();
      console.log("token: ", token);
    });
  }
}
