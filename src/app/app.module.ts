import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRippleModule} from '@angular/material/core';
import { ProductStatsComponent } from './components/product-stats/product-stats.component';
import { EmojiComponent } from './components/product-stats/emoji/emoji.component';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    ProductStatsComponent,
    EmojiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatListModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
