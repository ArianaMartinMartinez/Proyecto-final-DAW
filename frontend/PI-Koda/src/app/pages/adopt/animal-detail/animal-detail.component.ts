import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal.model';
import { Shelter } from 'src/app/models/shelter.model';
import { User } from 'src/app/models/user.model';
import { AdoptService } from 'src/app/services/adopt.service';
import { AnimalUserService } from 'src/app/services/animal-user.service';
import { SheltersService } from 'src/app/services/shelters.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {
  animal: Animal = new Animal();
  user: User = new User();
  shelter: Shelter = new Shelter();
  hasLoaded = false;
  animalGender = '';
  photo = '';
  shelterPhoto = '';

  isFavorite?: boolean;
  isAdmin: boolean = false;
  isShelter: boolean = false;

  editModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;
  editForm: FormGroup = new FormGroup({
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
    private _adoptService: AdoptService,
    private _sheltersService: SheltersService,
    private _animalUserService: AnimalUserService,
    private _modalService: BsModalService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAnimalDetail();
    this.isAdmin = this.user.user_role === 'admin';
    
    if(this.user.user_role === 'shelter') {
      this.getShelterByUserId();
    }
  }

  private getShelterByUserId() {
    this._sheltersService.getShelterByUserId(this.user.id).subscribe({
      next: (rtn) => {
        this.shelter = rtn[0];
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg);
      },
      complete: () => {
        this.isShelter = this.shelter.id === this.animal.shelter.id;
      }
    });
  }

  private getUser() {
    this.user = this._userService.get();
  }
  
  private getAnimalDetail() {
    const id = this._route.snapshot.paramMap.get('id');
    if(id) {
      this._adoptService.getAnimalById(id).subscribe({
        next: (rtn) => {
          this.animal = rtn;
        },
        error: (error) => {
          console.log(error);
          this._toastrService.error(error.error.msg);
        },
        complete: () => {
          this.hasLoaded = true;
          this.getFavorite();
          this.setAnimalGender();
          this.setDefaultPhoto();
        },
      });
    
    }
  }

  private setAnimalGender() {
    this.animalGender = this.animal.gender==='male' ? 'Macho' : 'Hembra';
  }

  private setDefaultPhoto() {
    this.photo = this.animal.photo===null ? '../../../../assets/default-animal.png' : this.animal.photo;

    this.shelterPhoto = this.animal.shelter.photo===null ? '../../../../assets/default-user.png' : this.animal.shelter.photo;
  }

  private getFavorite() {
    this._animalUserService.get(this.user.id).subscribe({
      next: (rtn) => {
        rtn.data.forEach((element: any) => {
          if(element.animal_id === this.animal.id) {
            this.isFavorite = true;
          }
        });
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg);
      }
    });
  }

  setFavorite(id: string) {
    if(this.isFavorite) {
      this.isFavorite = false;
      this._animalUserService.delete(id, this.user.id).subscribe({
        next: (rtn) => {
          console.log(rtn);
        },
        error: (error) => {
          console.log(error);
          this._toastrService.error(error.error.msg);
        },
      });

      return
    }

    this.isFavorite = true;
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

  openEditModal(editModal: TemplateRef<any>) {
    this.editModalRef = this._modalService.show(editModal);
    this.fillEditForm();
  }

  openDeleteModal(deleteModal: TemplateRef<any>) {
    this.deleteModalRef = this._modalService.show(deleteModal);
  }

  private fillEditForm() {
    this.editForm = this._formBuilder.group({
      name: [this.animal.name, [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s]+$/)]],
      animalType: [this.animal.animal_type, Validators.required],
      breed: [this.animal.breed, [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s]+$/)]],
      gender: [this.animal.gender, Validators.required],
      dateBirth: [this.animal.date_birth, Validators.required],
      photo: [this.animal.photo],
      description: [this.animal.description, [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
    });
  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit() {
    if(this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.hasLoaded = false;

    const body = {
      name: this.editForm.get('name')?.value,
      animal_type: this.editForm.get('animalType')?.value,
      breed: this.editForm.get('breed')?.value,
      gender: this.editForm.get('gender')?.value,
      date_birth: this.editForm.get('dateBirth')?.value,
      photo: this.editForm.get('photo')?.value,
      description: this.editForm.get('description')?.value,
      shelter_id: this.animal.shelter.id,
    }

    this._adoptService.put(this.animal.id, body).subscribe({
      next: (rtn) => {
        this._toastrService.success(rtn.msg);
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg);
      },
      complete: () => {
        this.getAnimalDetail();
      },
    });
    
    this.editModalRef?.hide();
  }

  confirmDelete() {
    this._adoptService.delete(this.animal.id).subscribe({
      next: (rtn) => {
        this._toastrService.success(rtn.msg);
        this._router.navigate(['/adopt']);
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error(error.error.msg);
      },
    });
    this.deleteModalRef?.hide();
  }
}
