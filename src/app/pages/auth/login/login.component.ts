import { Component, OnInit } from '@angular/core';
import {
  OidcClientNotification,
  OidcSecurityService,
  PublicConfiguration
} from 'angular-auth-oidc-client';
// rxjs
import { Observable } from 'rxjs';
// Environment
import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {}

  login() {
    //this.oidcSecurityService.authorize({ customParams: { 'ui_locales': culture } });
    this.oidcSecurityService.authorize();
  }

  /*
  private strRandom(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  goToLoginPage() {
    const state = this.strRandom(40);
    const codeVerifier = this.strRandom(128);
    localStorage.setItem('state', state);
    localStorage.setItem('codeVerifier', codeVerifier);

    const codeVerifierHash = CryptoJS.SHA256(codeVerifier).toString(
      CryptoJS.enc.Base64
    );

    const codeChallenge = codeVerifierHash
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    const params = [
      'response_type=code',
      'state=' + state,
      'client_id=' + environment.oauthClientId,
      'scope=openid profile email https://www.googleapis.com/auth/gmail.readonly',
      'code_challenge=' + codeChallenge,
      'code_challenge_method=S256',
      'redirect_uri=' + encodeURIComponent(environment.oauthCallbackUrl)
    ];
    console.log('url: ', environment.oauthLoginUrl + '?' + params.join('&'));
    window.location.href = environment.oauthLoginUrl + '?' + params.join('&');
  }*/
}
