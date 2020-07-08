// Obtener account_id: https://www.googleapis.com/admin/directory/v1/users/liz@example.com (https://developers.google.com/admin-sdk/directory/v1/guides/manage-users)
// Google Scope: https://developers.google.com/identity/protocols/oauth2/scopes#openid_connect
// https://developers.google.com/gmail/api/v1/reference/users/messages/list#javascript
//https://stackoverflow.com/questions/58605719/how-to-get-profile-info-google-photo-library-api
// https://github.com/HaithemMosbahi/ngx-avatar/issues/51
//https://stackoverflow.com/questions/46349746/is-there-any-way-that-i-can-retrieve-account-id-from-google-contact-api-v3-to-ma
// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
// Environment
import { environment } from 'src/environments/environment';
// Models
import { MessagesList } from 'src/app/core/models/messages-list.model';
// Constants
const API_URL: string = environment.GAPI_URL;
import { MAT_COLORS } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class GmailService {
  constructor(private http: HttpClient) {}

  getMessages(
    userId: string,
    authtoken: string,
    limit: number = 10
  ): Observable<any> {
    return this.http
      .get<MessagesList>(
        `${API_URL}/${userId}/messages?maxResults=${limit}&labelIds=UNREAD&labelIds=INBOX&q=category:primary`,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${authtoken}`
          })
        }
      )
      .pipe(
        switchMap((res) => {
          let requests = [];
          const results = res.messages;
          results.forEach((item, index) => {
            requests.push(
              this.getMessageById(userId, authtoken, item.id, index)
            );
          });
          return forkJoin(requests); // [{ message, subject}, { message, subject}, { message, subject}, { message, subject}]
        })
      );
  }

  getMessageById(userId: string, authToken: string, id: string, index: number) {
    return this.http
      .get(`${API_URL}/${userId}/messages/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${authToken}`
        })
      })
      .pipe(
        map((res: any) => {
          let headers = res.payload.headers;
          let filtered = headers.filter((item) => {
            return (
              item.name === 'From' ||
              item.name === 'Subject' ||
              item.name === 'Date'
            );
          });
          filtered = this.formatMessageResponse(filtered, 'name', index);

          //filtered.date = new Date(filtered.date);

          return {
            ...filtered,
            id: res.id,
            detail: res.snippet
          };
        })
      );
  }

  getProfile(userId: string, authtoken: string) {
    return this.http.get(`${API_URL}/${userId}/profile`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authtoken}`
      })
    });
  }

  // este sirve
  getUserInfo(authtoken: string) {
    return this.http.get(`https://www.googleapis.com//userinfo/v2/me`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authtoken}`
      })
    });
  }

  getPublicPhoto(authtoken: string) {
    return this.http.get(
      `https://people.googleapis.com/v1/people/102664400979121925528?personFields=names%2Cphotos`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${authtoken}`
        })
      }
    );
  }

  formatMessageResponse(array, key, index) {
    let res = array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key].toLowerCase()]: item.value
      };
    }, {});

    const nameAndEmail = this.getNameAndEmail(res.from);
    const imageParams = this.getImageParams(nameAndEmail.name, index);

    return {
      ...res,
      ...nameAndEmail,
      image_params: imageParams
    };
  }

  /*
   create(authtoken: string): Observable<any> {
        return this.httpClient.post(this.API_URL,{}, {
          headers: new HttpHeaders({
                Authorization: `Bearer ${authtoken}`
            })
        });
    }
   */

  getNameAndEmail(value: string) {
    const temp_index = value.indexOf('<');
    let name = value.substring(0, temp_index - 1);
    name = name.replace(/\"/g, '');

    let email = value.substring(temp_index + 1, value.length);
    email = email.replace(/>/g, '');

    return {
      name,
      email
    };
  }

  private getImageParams(name: string, index: number) {
    name = name.replace(/\|/g, '');
    name = name.replace(/\s{2,}/g, ' ');
    const names = name.split(' ', 2);
    const length = names.length;

    let letters;
    if (length === 1) letters = names[0];
    else if (length === 2) letters = `${names[0]} ${names[1]}`;
    else letters = 'U';

    return `&name=${letters}&length=${length}&background=${MAT_COLORS[index]}`;
  }
}
