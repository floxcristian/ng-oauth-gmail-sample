// Angular
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
// rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// OIDC
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map((isAuthorized: boolean) => {
        console.log(
          'AuthorizationGuard, canActivate isAuthorized: ',
          isAuthorized
        );

        if (!isAuthorized) {
          //this.router.navigate(['/unauthorized']);
          this.router.navigate(['auth/login']);
          return false;
        }
        return true;
      })
    );
  }
}
