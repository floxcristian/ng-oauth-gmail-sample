// https://github.com/google/google-api-javascript-client
// Angular
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
// Modules
import { AppRoutingModule } from './app-routing.module';
// Root component
import { AppComponent } from './app.component';
// OIDC
import { AuthModule, OidcConfigService } from 'angular-auth-oidc-client';
import { configureAuth } from './configure-auth';
// Pages
import { ErrorPageComponent } from './error-page/error-page.component';
// Modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    CoreModule,
    SharedModule
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
