import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, SafePipe } from './app.component';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { UserItemComponent } from './components/main-nav/left-sidebar-content/user-item/user-item.component';
import { SidebarItemComponent } from './components/main-nav/left-sidebar-content/sidebar-item/sidebar-item.component';
import { LeftSidebarContentComponent } from './components/main-nav/left-sidebar-content/left-sidebar-content.component';
import {AppRoutingModule} from './app-routing.module';
import { ProductsListComponent } from './components/main-nav/content/products-list/products-list.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { UsersListComponent } from './components/main-nav/content/users-list/users-list.component';
import { UserComponent } from './components/main-nav/content/users-list/user/user.component';
import { FollowButtonComponent } from './components/shared/follow-button/follow-button.component';
import { RightSidebarContentComponent } from './components/main-nav/right-sidebar-content/right-sidebar-content.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FeedListComponent } from './components/main-nav/content/feed-list/feed-list.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { ClickOutsideModule } from 'ng-click-outside';
import { NotificationItemComponent } from './components/main-nav/header-content/notification/notification-item/notification-item.component';
import {MainInterceptorService} from './services/interceptors/main-interceptor.service';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ReactionsDialogComponent} from './components/shared/reactions-dialog/reactions-dialog.component';
import { ProfilePageComponent } from './components/main-nav/content/profile-page/profile-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
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
    LeftSidebarContentComponent,
    ProductsListComponent,
    UsersListComponent,
    UserComponent,
    FollowButtonComponent,
    RightSidebarContentComponent,
    FeedListComponent,
    NotificationItemComponent,
    ReactionsDialogComponent,
    ProfilePageComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
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
    MatSlideToggleModule,
    MatBadgeModule,
    MatMenuModule,
    ClickOutsideModule,
    ScrollingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    SocialLoginModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptorService, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('805895933099-kstnnjis8onuvi6l6onchstamrjuvv3n.apps.googleusercontent.com')
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
