import { Component, Input, OnInit } from '@angular/core';
import { Shelter } from 'src/app/models/shelter.model';

@Component({
  selector: 'app-shelter-card',
  templateUrl: './shelter-card.component.html',
  styleUrls: ['./shelter-card.component.scss']
})
export class ShelterCardComponent implements OnInit {
  photo = '';

  @Input()
  public shelter: Shelter = new Shelter();

  ngOnInit(): void {
    if(!this.shelter) throw new Error('Shelter property is required');

    this.photo = this.shelter.photo===null ? 'assets/default-user.png' : this.shelter.photo;
  }

}
