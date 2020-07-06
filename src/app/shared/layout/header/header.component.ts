// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// OIDC
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private _authSrv: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this._authSrv.logout();
  }
}
