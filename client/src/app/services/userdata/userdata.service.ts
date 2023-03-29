import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lab } from 'src/app/interfaces/lab.interface';
import { baseBackendURL, VAPID_PUBLIC_KEY } from 'src/config';
import { Details } from '../../interfaces/details.interface';
import { User } from '../../interfaces/user.interface';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private baseUrl = `${baseBackendURL}/user`;

  constructor(private http: HttpClient, private swPush: SwPush) {}

  getUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  updateUserData(details: Details): Observable<User> {
    console.log(details);
    return this.http.put<User>(this.baseUrl, details, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  getClosestLab(): Observable<Lab> {
    return this.http.get<Lab>(`${baseBackendURL}/pathao/closest-studio`, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }
  saveNotificationSub(data: any) {
    let userId = '';
    this.getUser().subscribe((res) => {
      userId = res._id || '';
      this.http
        .post<{ msg: string }>(
          baseBackendURL + '/subscribeToNotification',
          { userId, subscriptionObject: data },
          {
            headers: {
              Authorization: `Bearer ${this.jwtToken}`,
            },
          }
        )
        .subscribe();
    });
  }

  requestNotificationPermission() {
    this.swPush
      .requestSubscription({ serverPublicKey: VAPID_PUBLIC_KEY })
      .then((res) => {
        this.saveNotificationSub(res);
      });
  }

  getCountries(): Observable<string[]> {
    return this.http.get<string[]>(`${baseBackendURL}/countries`);
  }
  private get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }
}
