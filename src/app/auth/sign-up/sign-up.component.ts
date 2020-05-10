import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth-component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  signUp() {}
}
