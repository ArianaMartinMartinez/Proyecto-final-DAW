import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdoptComponent } from './adopt/adopt.component';
import { BlogComponent } from './blog/blog.component';
import { ColabComponent } from './colab/colab.component';
import { SheltersComponent } from './shelters/shelters.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AnimalDetailComponent } from './adopt/animal-detail/animal-detail.component';
import { ShelterDetailComponent } from './shelters/shelter-detail/shelter-detail.component';
import { ArticleDetailComponent } from './blog/article-detail/article-detail.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './landing-page/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FavsComponent } from './favs/favs.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './landing-page/register/register.component';
import { MyShelterComponent } from './my-shelter/my-shelter.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AboutUsComponent,
    AdoptComponent,
    BlogComponent,
    ColabComponent,
    SheltersComponent,
    AnimalDetailComponent,
    ShelterDetailComponent,
    ArticleDetailComponent,
    LoginComponent,
    ProfileComponent,
    FavsComponent,
    LandingPageComponent,
    RegisterComponent,
    MyShelterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  exports: [
    RouterModule,
    PagesComponent,
    HomeComponent,
    AdoptComponent,
    SheltersComponent,
    ColabComponent,
    BlogComponent,
    AboutUsComponent,
    AnimalDetailComponent,
    ShelterDetailComponent,
    ArticleDetailComponent,
    LoginComponent,
    ProfileComponent,
    FavsComponent,
    LandingPageComponent,
    RegisterComponent,
    MyShelterComponent,
  ],
  providers: [
    BsModalService,
  ],
})
export class PagesModule { }
