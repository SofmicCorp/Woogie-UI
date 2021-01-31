import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WoogieFrontRoutes} from './constants/woogie-front-routes';
import {MainNavComponent} from './components/main-nav/main-nav.component';
import {ProductsListComponent} from './components/main-nav/content/products-list/products-list.component';


const appRoutes: Routes = [
  // {path: MercuryPaths.login, component: LoginComponent},
  // {path: MercuryPaths.callback, component: CallbackComponent},
  {path: '', redirectTo: '/' + WoogieFrontRoutes.home, pathMatch: 'full'},
  {path: WoogieFrontRoutes.home, component: MainNavComponent, children: [
      {path: WoogieFrontRoutes.products, component: ProductsListComponent},
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
