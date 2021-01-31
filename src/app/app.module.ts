import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { ProductReactionsComponent } from './components/main-nav/content/products-list/product/product-reactions/product-reactions.component';
import { ReactionComponent } from './components/main-nav/content/products-list/product/product-reactions/emoji/reaction.component';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ProductComponent } from './components/main-nav/content/products-list/product/product.component';
import { SearchComponent } from './components/main-nav/header-content/search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HeaderContentComponent } from './components/main-nav/header-content/header-content.component';
import { NotificationComponent } from './components/main-nav/header-content/notification/notification.component';
import { ProfileComponent } from './components/main-nav/header-content/profile/profile.component';
import { LogoutComponent } from './components/main-nav/header-content/logout/logout.component';
import { UserItemComponent } from './components/main-nav/sidebar-content/user-item/user-item.component';
import { SidebarItemComponent } from './components/main-nav/sidebar-content/sidebar-item/sidebar-item.component';
import { SidebarContentComponent } from './components/main-nav/sidebar-content/sidebar-content.component';
import {AppRoutingModule} from './app-routing.module';
import { ProductsListComponent } from './components/main-nav/content/products-list/products-list.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    ProductReactionsComponent,
    ReactionComponent,
    ProductComponent,
    SearchComponent,
    MainNavComponent,
    HeaderContentComponent,
    NotificationComponent,
    ProfileComponent,
    LogoutComponent,
    UserItemComponent,
    SidebarItemComponent,
    SidebarContentComponent,
    ProductsListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatRippleModule,
    MatExpansionModule,
    MatGridListModule,
    MatRadioModule,
    HttpClientModule,
    MatCheckboxModule,
    MatStepperModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
