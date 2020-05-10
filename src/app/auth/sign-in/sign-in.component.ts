import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth-component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  returnUrl = '/';
  error: any;

  showSpinner = localStorage.getItem('showSpinner') === 'true' ? true : false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.authService.authState().subscribe((auth) => {
      localStorage.setItem('showSpinner', 'false');
      if (auth) {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => (this.returnUrl = params.returnUrl || '/home')
    );
  }

  loginFb() {
    this.showSpinner = true;
    localStorage.setItem('showSpinner', 'true');
    this.authService
      .loginFb()
      .then((result) => {
        if (result.user) {
          this.showSpinner = true;
          localStorage.setItem('showSpinner', 'true');
          this.router.navigate([this.returnUrl]);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        this.error = errorMessage;
      });
  }

  loginGoogle() {
    this.authService
      .loginGoogle()
      .then((success) => {
        this.router.navigate([this.returnUrl]);
      })
      .catch((err) => {
        this.error = err;
      });
  }

  loginEmail() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.authService
        .loginEmail(email, password)
        .then((success) => {
          console.log('success', success);
          this.router.navigate([this.returnUrl]);
        })
        .catch((err) => {
          console.log('err', err);
          this.error = err;
        });
    }
  }
}
