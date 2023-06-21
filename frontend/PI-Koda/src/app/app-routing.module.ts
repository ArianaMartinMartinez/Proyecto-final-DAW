import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdoptComponent } from './pages/adopt/adopt.component';
import { SheltersComponent } from './pages/shelters/shelters.component';
import { ColabComponent } from './pages/colab/colab.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PagesComponent } from './pages/pages.component';
import { AnimalDetailComponent } from './pages/adopt/animal-detail/animal-detail.component';
import { ShelterDetailComponent } from './pages/shelters/shelter-detail/shelter-detail.component';
import { ArticleDetailComponent } from './pages/blog/article-detail/article-detail.component';
import { LoginGuard } from './login-guard.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { FavsComponent } from './pages/favs/favs.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MyShelterComponent } from './pages/my-shelter/my-shelter.component';

const routes: Routes = [
  {
    path: 'login',
    component: LandingPageComponent,
  },
  { 
    path: 'home', 
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{ path: '' , component: HomeComponent}],
  },
  { 
    path: 'adopt',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{path: '', component: AdoptComponent}],
  },
  { 
    path: 'shelters',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{path: '', component: SheltersComponent}],
  },
  { 
    path: 'colab',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{path: '', component: ColabComponent}],
  },
  { 
    path: 'blog',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{path: '', component: BlogComponent}],
  },
  { 
    path: 'about-us',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{path: '', component: AboutUsComponent}],
  },
  {
    path: 'adopt/:id',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{path: '', component: AnimalDetailComponent}],
  },
  {
    path: 'shelters/:id',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{path: '', component: ShelterDetailComponent}],
  },
  {
    path: 'blog/:id',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{path: '', component: ArticleDetailComponent}],
  },
  {
    path: 'profile',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{path: '', component: ProfileComponent}],
  },
  {
    path: 'my-shelter',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{path: '', component: MyShelterComponent}],
  },
  {
    path: 'favorites',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{path: '', component: FavsComponent}],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
