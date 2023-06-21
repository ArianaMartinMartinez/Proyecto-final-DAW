import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  submitted = false;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this._loginService.login(credentials).subscribe({
      next: (rtn) => {
        localStorage.setItem('user_token', rtn.token);
        localStorage.setItem('user', JSON.stringify(rtn.user));
        this._router.navigate(['home']);
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg)
      },
      complete: () => {},
    });
  }
}
