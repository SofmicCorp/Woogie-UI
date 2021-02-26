import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WoogieFrontRoutes} from './constants/woogie-front-routes';
import {MainNavComponent} from './components/main-nav/main-nav.component';
import {ProductsListComponent} from './components/main-nav/content/products-list/products-list.component';
import {UsersListComponent} from './components/main-nav/content/users-list/users-list.component';
import {FeedListComponent} from './components/main-nav/content/feed-list/feed-list.component';
import {ProfilePageComponent} from './components/main-nav/content/profile-page/profile-page.component';
import {FirstEntranceGuardService} from './services/first-entrance-guard.service';

const appRoutes: Routes = [
  // {path: MercuryPaths.login, component: LoginComponent},
  // {path: MercuryPaths.callback, component: CallbackComponent},
  {path: '', redirectTo: '/' + WoogieFrontRoutes.home, pathMatch: 'full'},
  {path: WoogieFrontRoutes.home, component: MainNavComponent, children: [
      {path: '', component: FeedListComponent},
      {path: WoogieFrontRoutes.products, component: ProductsListComponent, canActivate: [FirstEntranceGuardService]},
      {path: WoogieFrontRoutes.people, component: UsersListComponent, canActivate: [FirstEntranceGuardService]},
      {path: WoogieFrontRoutes.profile, component: ProfilePageComponent},
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
