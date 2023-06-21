import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Animal } from 'src/app/models/animal.model';
import { City } from 'src/app/models/city.model';
import { User } from 'src/app/models/user.model';
import { AdoptService } from 'src/app/services/adopt.service';
import { AnimalUserService } from 'src/app/services/animal-user.service';
import { CitiesService } from 'src/app/services/cities.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.scss'],
})
export class AdoptComponent implements OnInit {
  user: User = new User();
  animals: Animal[] = [];
  favorites: string[] = [];
  
  animalTypes: any[] = [
    {id: 'dog', name: 'Perro'},
    {id: 'cat', name: 'Gato'},
    {id: 'bird', name: 'Ave'},
    {id: 'rodent', name: 'Roedor'},
  ];
  genders: any[] = [
    {id: 'male', name: 'Macho'},
    {id: 'female', name: 'Hembra'},
  ];
  cities: City[] = [];

  hasLoaded = false;
  totalAnimals: number = 0;
  currentPage = 1;
  pageSize = 20;
  page?: number;

  searchForm!: FormGroup;

  constructor(
    private _userService: UserService,
    private _adoptService: AdoptService,
    private _citiesService: CitiesService,
    private _animalUserService: AnimalUserService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAnimals(this.currentPage);
    this.getFavorites();

    this.getCities();

    this.searchForm = this._formBuilder.group({
      animalType: [],
      gender: [],
      city: [],
      breed: [],
    });
  }

  private getUser() {
    this.user = this._userService.get();
  }

  private getCities() {
    this._citiesService.get().subscribe({
      next: (rtn) => {
        this.cities = rtn;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  private getAnimals(page: number) {
    this._adoptService.get(page).subscribe({
      next: (rtn) => {
        this.animals = rtn.data;
        this.totalAnimals = rtn.total;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.hasLoaded = true;
      },
    });
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
      }
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.getAnimals(this.page);
  }

  onSubmit() {
    this.hasLoaded = false;
    const body: any = {};
    if(this.searchForm.get('animalType')?.value) {
      body['animalType'] = this.searchForm.get('animalType')?.value.id;
    }
    if(this.searchForm.get('gender')?.value) {
      body['gender'] = this.searchForm.get('gender')?.value.id;
    }
    if(this.searchForm.get('city')?.value) {
      body['city'] = this.searchForm.get('city')?.value.id;
    }
    if(this.searchForm.get('breed')?.value) {
      body['breed'] = this.searchForm.get('breed')?.value;
    }

    this._adoptService.filterAnimals(body).subscribe({
      next: (rtn) => {
        this.animals = rtn.data;
        this.totalAnimals = rtn.total;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.hasLoaded = true;
      }
    });
  }
}
