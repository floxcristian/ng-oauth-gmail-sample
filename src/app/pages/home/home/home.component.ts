// Angular
import { Component, OnInit } from '@angular/core';
// OIDC
import { OidcSecurityService } from 'angular-auth-oidc-client';
// Services
import { GmailService } from '../../../core/services/gmail/gmail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authtoken: any;
  userId: string = 'cristianflores.ee@gmail.com';
  messages: Array<any>;
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private _gmailSrv: GmailService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.oidcSecurityService.logoff();
  }

  getMessages() {
    this.authtoken = localStorage.getItem('accesstoken');
    this._gmailSrv.getMessages(this.userId, this.authtoken).subscribe((res) => {
      this.messages = res;
    });
  }

  getProfile() {
    this.authtoken = localStorage.getItem('accesstoken');

    this._gmailSrv.getProfile(this.userId, this.authtoken).subscribe((res) => {
      console.log('profile: ', res);
    });
  }
}
