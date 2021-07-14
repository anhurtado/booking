import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppService {
  constructor(private httpClient: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    const headers = {
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json',
      password,
      app: 'APP_BCK'
    };
    return this.httpClient.put(`${ environment.backend }/user/${ email }`, null, { headers });
  }

  public getBooking(email: string, adminemail: string, token: string): Observable<any> {
    const headers = {
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json',
      adminemail,
      token,
      app: 'APP_BCK'
    };
    return this.httpClient.get(`${ environment.backend }/user/${ email }/bookings?current=true`, { headers });
  }
}
