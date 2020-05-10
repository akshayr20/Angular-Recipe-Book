import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth-component.scss'],
})
export class AuthComponent {
  authForm: FormGroup;
  returnUrl = '/';
  error: any;
  googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

  showSpinner = localStorage.getItem('showSpinner') === 'true' ? true : false;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.afAuth.authState.subscribe((auth) => {
      localStorage.setItem('showSpinner', 'false');
      if (auth) {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }

  loginFb() {
    this.showSpinner = true;
    localStorage.setItem('showSpinner', 'true');
    this.afAuth.signInWithRedirect(this.facebookAuthProvider);
    this.afAuth
      .getRedirectResult()
      .then((result) => {
        if (result.user) {
          this.showSpinner = true;
          localStorage.setItem('showSpinner', 'true');
          this.router.navigate([this.returnUrl]);
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        this.error = errorMessage;
      });
  }

  loginGoogle() {
    this.afAuth
      .signInWithRedirect(this.googleAuthProvider)
      .then((success) => {
        this.router.navigate([this.returnUrl]);
      })
      .catch((err) => {
        this.error = err;
      });
  }

  loginEmail() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((success) => {
          this.router.navigate([this.returnUrl]);
        })
        .catch((err) => {
          this.error = err;
        });
    }
  }
}
