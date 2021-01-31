import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WoogieFrontRoutes} from './constants/woogie-front-routes';
import {SearchComponent} from './components/main-nav/content/search/search.component';
import {MainNavComponent} from './components/main-nav/main-nav.component';


const appRoutes: Routes = [
  // {path: MercuryPaths.login, component: LoginComponent},
  // {path: MercuryPaths.callback, component: CallbackComponent},
  {path: '', redirectTo: '/' + WoogieFrontRoutes.home, pathMatch: 'full'},
  {path: WoogieFrontRoutes.home, component: MainNavComponent, children: [
      {path: WoogieFrontRoutes.products, component: SearchComponent},
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
