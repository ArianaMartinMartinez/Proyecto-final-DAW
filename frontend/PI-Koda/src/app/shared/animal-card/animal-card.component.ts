import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss']
})
export class AnimalCardComponent implements OnInit{
  constructor() {}

  ngOnInit(): void {
    this.setDefaultPhoto();
  }

  @Input()
  public photo?: string = '';
  @Input()
  public name: string = '';
  @Input()
  public city: string = '';
  @Input()
  public id: string = '';
  @Input()
  public isFavorite?: boolean;
  @Input()
  public animalType: string = '';

  @Output()
  public favoriteSelected: EventEmitter<string> = new EventEmitter<string>();

  private setDefaultPhoto() {
    if(this.photo === null) this.photo = 'assets/default-animal.png';
  }

  public favorite(id: string) {
    this.favoriteSelected.emit(id);
  }
}
