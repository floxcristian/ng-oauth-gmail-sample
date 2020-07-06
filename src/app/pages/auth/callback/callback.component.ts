// PKCE guide: https://niceprogrammer.com/angular-8-oauth-2-authorization-code-flow-with-pkce/?fbclid=IwAR2p2rZtviDChbeNPLJVBiIFxH0ZfbGGpuztCAP56tsLgUjjqpi469PXGro
// Angular
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
// Environment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.code) this.getAccessToken(params.code, params.state);
    });
  }

  getAccessToken(code: string, state: string) {
    console.log('intentando obtener el access token...');
    if (state !== localStorage.getItem('state')) {
      alert('Invalid state');
      return;
    }
    const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('code_verifier', localStorage.getItem('codeVerifier'))
      .append('redirect_uri', environment.oauthCallbackUrl)
      .append('client_id', environment.oauthClientId)
      .append('client_secret', environment.clienSecret);
    this.http
      .post(environment.oauthTokenUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .subscribe((response) => {
        console.log(response);
        // store access token
      });
  }
}
