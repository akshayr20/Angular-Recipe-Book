import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    const authPayload = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponseData>(`${environment.auth}`, authPayload);
  }

  login(email: string, password: string) {
    const authPayload = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponseData>(`${environment.login}`, authPayload);
  }
}
