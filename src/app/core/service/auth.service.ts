import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  public authState() {
    return this.afAuth.authState;
  }

  public logout() {
    this.afAuth.signOut().then(
      (res) => {
        this.router.navigate(['/auth']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public loginFb() {
    this.afAuth.signInWithRedirect(this.facebookAuthProvider);
    return this.afAuth.getRedirectResult();
  }

  public loginGoogle() {
    return this.afAuth.signInWithRedirect(this.googleAuthProvider);
  }

  public loginEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  public createUserWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}
