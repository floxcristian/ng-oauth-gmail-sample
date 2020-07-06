// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs
import { Observable } from 'rxjs';
// OIDC
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static SESSION_STORAGE_KEY: string = 'accessToken';
  private user;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {}

  getToken(): string {
    const token: string = sessionStorage.getItem(
      AuthService.SESSION_STORAGE_KEY
    );
    if (!token) throw new Error('No token set, authentication required.');
    return token;
  }

  isUserSignedIn(): boolean {
    return !sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY);
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
    this.router.navigate(['auth/login']);
  }

  /*

  public setUser(user: GoogleUser): void {
        this.user = user;
    }

    public getCurrentUser(): GoogleUser {
        return this.user;
    }

  signIn(): void {
    this.googleAuth.getAuth().subscribe((auth) => {
      auth.signIn().then((res) => this.signInSuccessHandler(res));
    });
  }

  signInSuccessHandler(res: GoogleUser) {
    this.user = res;
    sessionStorage.setItem(AuthService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
  }

  signOut(): void {
    this.googleAuthService.getAuth().subscribe((auth) => {
            try {
                auth.signOut();
            } catch (e) {
                console.error(e);
            }
            sessionStorage.removeItem(AuthService.SESSION_STORAGE_KEY)
        });
  }*/
}
