import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Animal } from 'src/app/models/animal.model';
import { City } from 'src/app/models/city.model';
import { User } from 'src/app/models/user.model';
import { AdoptService } from 'src/app/services/adopt.service';
import { AnimalUserService } from 'src/app/services/animal-user.service';
import { CitiesService } from 'src/app/services/cities.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  animals: Animal[] = [];
  cities: City[] = [];
  animalType: any[] = [
    {id: 'dog', name: 'Perro'},
    {id: 'cat', name: 'Gato'},
    {id: 'bird', name: 'Ave'},
    {id: 'rodent', name: 'Roedor'},
  ];
  favorites: string[] = [];
  user: User = new User();

  hasLoaded = false;
  currentPage = 1;

  searchForm!: FormGroup;

  constructor(
    private _userService: UserService,
    private _adoptService: AdoptService,
    private _citiesService: CitiesService,
    private _animalUserService: AnimalUserService,
    private _formBuilder: FormBuilder,
  ) {
    this.searchForm = new FormGroup({
      animalType: new FormControl(),
      city: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getCities();

    this.searchForm = this._formBuilder.group({
      animalType: [],
      city: [],
    });

    this.getAnimals();
    this.getFavorites();
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

  private getAnimals() {
    this._adoptService.get(this.currentPage).subscribe({
      next: (rtn) => {
        this.animals = rtn.data;
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
    }
    this._animalUserService.post(body).subscribe({
      next: (rtn) => {
        console.log(rtn);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSubmit() {
    const body = {
      animalType: this.searchForm.get('animalType')?.value ? this.searchForm.get('animalType')?.value.id : null,
      city: this.searchForm.get('city')?.value ? this.searchForm.get('city')?.value.id : null,
    };

    console.log(body);

    this._adoptService.filterAnimals(body).subscribe({
      next: (rtn) => {
        console.log(rtn);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
