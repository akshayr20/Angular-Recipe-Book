import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth-component.scss'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  error: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      this.authService
        .createUserWithEmailAndPassword(email, password)
        .then((success) => {
          this.router.navigate(['/auth']);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
