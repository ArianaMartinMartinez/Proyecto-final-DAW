import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Shelter } from 'src/app/models/shelter.model';
import { User } from 'src/app/models/user.model';
import { AdoptService } from 'src/app/services/adopt.service';
import { AnimalUserService } from 'src/app/services/animal-user.service';
import { SheltersService } from 'src/app/services/shelters.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter-detail.component.html',
  styleUrls: ['./shelter-detail.component.scss']
})
export class ShelterDetailComponent implements OnInit {
  user: User = new User();
  shelter: Shelter = new Shelter();
  favorites: string[] = [];
  photo = '';

  hasLoaded = false;
  isAdmin: boolean = false;

  createModalRef?: BsModalRef;
  createForm: FormGroup = new FormGroup({
    name: new FormControl(),
    animalType: new FormControl(),
    breed: new FormControl(),
    gender: new FormControl(),
    dateBirth: new FormControl(),
    photo: new FormControl(),
    description: new FormControl(),
  });

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _sheltersService: SheltersService,
    private _adoptService: AdoptService,
    private _animalUserService: AnimalUserService,
    private _modalService: BsModalService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getShelter();

    this.isAdmin = this.user.user_role === 'admin';
  }

  private getUser() {
    this.user = this._userService.get();
  }

  private getShelter() {
    const id = this._route.snapshot.paramMap.get('id');
    if(id) {
      this._sheltersService.getShelterById(id).subscribe({
        next: (rtn) => {
          this.shelter = rtn;
        },
        error: (error) => {
          console.log(error);
          this._toastrService.error(error.error.msg);
        },
        complete: () => {
          this.hasLoaded = true;
          this.setDefaultPhoto();
          this.getFavorites()
        },
      });
    }
  }

  private setDefaultPhoto() {
    this.photo = this.shelter.photo===null ? 'assets/default-user.png' : this.shelter.photo;
  }

  private getFavorites() {
    this._animalUserService.get(this.user.id).subscribe({
      next: (rtn) => {
        rtn.data.forEach((element: any) => {
            this.favorites.push(element.animal_id);
        });
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg);
      },
    });
  }

  public setFavorite(id: string) {
    if (this.favorites.includes(id)) {
      const index = this.favorites.indexOf(id);
      if (index > -1) {
        this.favorites.splice(index, 1);

        this._animalUserService.delete(id, this.user.id).subscribe({
          next: (rtn) => {
            console.log(rtn);
          },
          error: (error) => {
            console.log(error);
            this._toastrService.error(error.error.msg);
          }
        });
      }
      return
    }
    this.favorites.push(id);
    const body = {
      animal_id: id,
      user_id: this.user.id,
    };
    this._animalUserService.post(body).subscribe({
      next: (rtn) => {
        console.log(rtn);
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg);
      }
    });
  }

  openCreateModal(addAnimalModal: TemplateRef<any>) {
    this.createModalRef = this._modalService.show(addAnimalModal);
    this.initializeCreateForm();
  }

  private initializeCreateForm() {
    this.createForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s]+$/)]],
      animalType: ['', Validators.required],
      breed: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s]+$/)]],
      gender: ['', Validators.required],
      dateBirth: ['', Validators.required],
      photo: [''],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
    });
  }

  get f() {
    return this.createForm.controls;
  }

  onSubmit() {
    if(this.createForm.invalid){
      this.createForm.markAllAsTouched();
      return;
    }

    this.hasLoaded = false;

    const body = {
      name: this.createForm.get('name')?.value,
      animal_type: this.createForm.get('animalType')?.value,
      breed: this.createForm.get('breed')?.value,
      gender: this.createForm.get('gender')?.value,
      date_birth: this.createForm.get('dateBirth')?.value,
      photo: this.createForm.get('photo')?.value,
      description: this.createForm.get('description')?.value,
      shelter_id: this.shelter.id,
    }

    this._adoptService.post(body).subscribe({
      next: (rtn) => {
        this._toastrService.success(rtn.msg);
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg);
      },
      complete: () => {
        this.getShelter();
      },
    });

    this.createModalRef?.hide();
  }
}
