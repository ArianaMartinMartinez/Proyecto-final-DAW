import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal.model';
import { User } from 'src/app/models/user.model';
import { AnimalUserService } from 'src/app/services/animal-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.scss']
})
export class FavsComponent implements OnInit {
  user: User = new User();
  animals: Animal[] = [];
  favorites: string[] = [];
  
  hasLoaded = false;

  constructor(
    private _userService: UserService,
    private _animalUserService: AnimalUserService,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavorites();
  }
  
  private getUser() {
    this.user = this._userService.get();
  }

  private getFavorites() {
    this._animalUserService.get(`all/${this.user.id}`).subscribe({
      next: (rtn) => {
        rtn.forEach((element: any) => {
          this.animals.push(element.animal);
          this.favorites.push(element.animal_id);
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.hasLoaded = true;
      }
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
}
