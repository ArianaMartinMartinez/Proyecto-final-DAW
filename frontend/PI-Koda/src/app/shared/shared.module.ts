import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AnimalCardComponent } from './animal-card/animal-card.component';
import { ShelterCardComponent } from './shelter-card/shelter-card.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { BlogCardComponent } from './blog-card/blog-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AnimalCardComponent,
    ShelterCardComponent,
    LoaderComponent,
    BlogCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    AnimalCardComponent,
    ShelterCardComponent,
    LoaderComponent,
    BlogCardComponent,
  ]
})
export class SharedModule { }
