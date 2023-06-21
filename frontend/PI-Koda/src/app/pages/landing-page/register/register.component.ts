import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SheltersService } from 'src/app/services/shelters.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });
  isShelterRegister = false;
  submitted = false;

  private shelterUserId?: string;

  constructor(
    private _userService: UserService,
    private _sheltersService: SheltersService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  changeRegister() {
    this.isShelterRegister = !this.isShelterRegister;
    this.submitted = false;
  }

  private emptyForm() {
    this.registerForm.get('name')?.setValue('');
    this.registerForm.get('email')?.setValue('');
    this.registerForm.get('password')?.setValue('');
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmitAdopter() {
    this.submitted = true;
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const body = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      user_role: 'adopter',
    };

    this._userService.post(body).subscribe({
      next: (rtn) => {
        this._toastrService.success(rtn.msg);
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg);
      },
      complete: () => {
        this.emptyForm();
      }
    });
  }

  onSubmitShelter() {
    this.submitted = true;
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    
    const body = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      user_role: 'shelter',
    };

    this._userService.post(body).subscribe({
      next: (rtn) => {
        this.shelterUserId = rtn.data.id;
        this._toastrService.success(rtn.msg);
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg);
      },
      complete: () => {
        this.emptyForm();
        this.createDefaultShelter();
      }
    });
  }

  private createDefaultShelter() {
    const body = {
      name: 'Nombre por defecto',
      email: 'default.email@example.com',
      description: 'Descripción por defecto',
      user_id: this.shelterUserId,
      city_id: 1,
    };

    this._sheltersService.post(body).subscribe({
      next: (rtn) => {
        console.log(rtn);
        this._toastrService.success('Por favor, modifica los datos de tu protectora', 'Protectora por defecto creada');
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg);
      }
    });
  }
}
