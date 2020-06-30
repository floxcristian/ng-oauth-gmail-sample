import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import {
  AuthModule,
  LogLevel,
  OidcConfigService,
} from "angular-auth-oidc-client";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig(
      {
        stsServer: "https://accounts.google.com",
        redirectUrl: `${window.location.origin}/home`,
        postLogoutRedirectUri: `${window.location.origin}/login`,
        postLoginRoute: "/home",
        forbiddenRoute: "/forbidden", // no hay permiso para acceder a recursos
        unauthorizedRoute: "/unauthorized",
        autoUserinfo: true,
        clientId:
          "599322351517-f0cb34grfekqot41daad1oq5fp1r7rov.apps.googleusercontent.com",
        scope: "openid profile email",
        responseType: "id_token token",
        silentRenew: true,
        silentRenewUrl: `${window.location.origin}/silent-renew.html`,
        renewTimeBeforeTokenExpiresInSeconds: 30,
        logLevel: LogLevel.Debug,
      }

      /*
    triggerAuthorizationResultEvent: true,
    startCheckSession: false,
    
    
    
    historyCleanupOff: true,*/
    );
}

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule.forRoot()],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
