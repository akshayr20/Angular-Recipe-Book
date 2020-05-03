import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../model/auth.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AuthResponseData {
  kind: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  handleAuthentication(
    email: string,
    localId: string,
    refreshToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, refreshToken, expirationDate);
    this.user.next(user);
  }

  signUp(email: string, password: string) {
    const authPayload = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponseData>(`${environment.auth}`, authPayload)
      .pipe(
        tap((resData) => {
          if (resData.email) {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.refreshToken,
              +resData.expiresIn
            );
          }
        })
      );
  }

  login(email: string, password: string) {
    const authPayload = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponseData>(`${environment.login}`, authPayload)
      .pipe(
        tap((resData) => {
          if (resData.email) {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.refreshToken,
              +resData.expiresIn
            );
          }
        })
      );
  }
}
