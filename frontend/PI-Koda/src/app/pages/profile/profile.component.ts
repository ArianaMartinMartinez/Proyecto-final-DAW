import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = new User();

  profileForm: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
  });

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.fillProfileForm();
  }

  private getUser() {
    this.user = this._userService.get();
  }

  private fillProfileForm() {
    this.profileForm = this._formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    if(this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const body = {
      name: this.profileForm.get('name')?.value,
      email: this.profileForm.get('email')?.value,
    };

    this._userService.put(this.user.id, body).subscribe({
      next: (rtn) => {
        this.user = rtn.data;
        localStorage.setItem('user', JSON.stringify(this.user));
        this._toastrService.success(rtn.msg);
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg);
      },
      complete: () => {
        this.getUser();
      }
    });
  }
}
