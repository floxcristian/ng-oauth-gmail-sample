// https://developers.google.com/gmail/api/v1/reference/users/messages/list#javascript
// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Environment
import { environment } from 'src/environments/environment';
// rxjs
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// Models
import { MessagesList } from 'src/app/core/models/messages-list.model';
// Constants
const API_URL: string = environment.GAPI_URL;

@Injectable({
  providedIn: 'root'
})
export class GmailService {
  constructor(private http: HttpClient) {}

  // authtoken as parameter only for demo purpose , better use a UserService to get the token
  getMessages(
    userId: string,
    authtoken: string,
    limit: number = 5
  ): Observable<any> {
    return this.http
      .get<MessagesList>(`${API_URL}/${userId}/messages?maxResults=${limit}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${authtoken}`
        })
      })
      .pipe(
        switchMap((res) => {
          let requests = [];
          const results = res.messages;
          results.forEach((item) => {
            requests.push(this.getMessageById(userId, authtoken, item.id));
          });
          return forkJoin(requests);
        })
      );
  }

  getMessageById(userId: string, authToken: string, id: string) {
    return this.http.get(`${API_URL}/${userId}/messages/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    });
  }

  getProfile(userId: string, authtoken: string) {
    return this.http.get(`${API_URL}/${userId}/profile`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authtoken}`
      })
    });
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
}