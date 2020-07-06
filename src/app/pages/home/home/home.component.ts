// https://stackoverflow.com/questions/58605719/how-to-get-profile-info-google-photo-library-api
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
  userId: string = 'me';
  messages: Array<any>;
  profile;
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private _gmailSrv: GmailService
  ) {}

  ngOnInit(): void {
    this.getMessages();
    this.getProfile();
  }

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
      this.profile = res;
      console.log('profile: ', res);
    });
  }

  getPhoto() {
    this.authtoken = localStorage.getItem('accesstoken');
    this._gmailSrv.getPhoto(this.authtoken).subscribe((res) => {
      console.log('photo: ', res);
    });
  }
}
