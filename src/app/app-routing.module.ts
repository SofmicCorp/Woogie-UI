import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WoogieFrontRoutes} from './constants/woogie-front-routes';
import {MainNavComponent} from './components/main-nav/main-nav.component';
import {ProductsListComponent} from './components/main-nav/content/products-list/products-list.component';
import {UsersListComponent} from './components/main-nav/content/users-list/users-list.component';
import {FeedListComponent} from './components/main-nav/content/feed-list/feed-list.component';
import {ProfilePageComponent} from './components/main-nav/content/profile-page/profile-page.component';
import {FirstEntranceGuardService} from './services/first-entrance-guard.service';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './services/guards/auth-guard.service';

const appRoutes: Routes = [
  {path: WoogieFrontRoutes.login, component: LoginComponent},
  {path: '', redirectTo: '/' + WoogieFrontRoutes.home, pathMatch: 'full'},
  {path: WoogieFrontRoutes.home, component: MainNavComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: FeedListComponent},
      {path: WoogieFrontRoutes.products, component: ProductsListComponent, canActivate: [FirstEntranceGuardService]},
      {path: WoogieFrontRoutes.people, component: UsersListComponent, canActivate: [FirstEntranceGuardService]},
      {path: WoogieFrontRoutes.profile + '/me', component: ProfilePageComponent},
      {path: WoogieFrontRoutes.profile + '/:id', component: ProfilePageComponent},
    ]
  }
  // {path: '**', pathMatch: 'full', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule{
}
