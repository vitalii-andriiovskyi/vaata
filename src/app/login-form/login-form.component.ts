import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonErrorStateMatcher } from '../utils/common-error-state-matcher';
import { UserCredentials } from '../models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() errorMessage: string | null;
  @Output() submitted = new EventEmitter<UserCredentials>();

  form: FormGroup = new FormGroup({
    username: new FormControl('xyz@gmail.com', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    keepLoggedIn: new FormControl(false)
  });

  hide = true;

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
  get keepLoggedIn() { return this.form.get('keepLoggedIn'); }
  matcher = new CommonErrorStateMatcher();

  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
