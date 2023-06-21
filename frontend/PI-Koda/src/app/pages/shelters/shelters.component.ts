import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { City } from 'src/app/models/city.model';
import { Shelter } from 'src/app/models/shelter.model';
import { CitiesService } from 'src/app/services/cities.service';
import { SheltersService } from 'src/app/services/shelters.service';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.scss']
})
export class SheltersComponent implements OnInit {
  shelters: Shelter[] = [];
  sheltersList: Shelter[] = [];
  cities: City[] = [];
  totalShelters: number = 0;
  hasLoaded = false;

  currentPage = 1;
  pageSize = 20;
  page?: number;

  searchForm!: FormGroup;

  constructor(
    private _sheltersService: SheltersService,
    private _citiesService: CitiesService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getCities();
    this.getShelters(this.currentPage);

    this.searchForm = this._formBuilder.group({
      shelter: [],
      city: [],
    });
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

  getShelters(page: number) {
    this._sheltersService.get(page).subscribe({
      next: (rtn) => {
        this.shelters = rtn.data;
        this.sheltersList = rtn.data;
        this.totalShelters = rtn.total;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.hasLoaded = true;
      },
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.getShelters(this.page);
  }

  onSubmit() {
    this.hasLoaded = false;
    const body: any = {};
    if(this.searchForm.get('shelter')?.value) {
      body['shelter'] = this.searchForm.get('shelter')?.value.id;
    }
    if(this.searchForm.get('city')?.value) {
      body['city'] = this.searchForm.get('city')?.value.id;
    }

    this._sheltersService.filterShelters(body).subscribe({
      next: (rtn) => {
        this.shelters = rtn.data;
        this.totalShelters = rtn.total;
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
