import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {FiltersComponent} from './filters/filters.component';
import {ProductComponent} from './product/product.component';
import {CartComponent} from './cart/cart.component';
import {ProductThumbnailComponent} from './product-thumbnail/product-thumbnail.component';
import {SortFiltersComponent} from './sort-filters/sort-filters.component';

import {CartService} from './cart.service';
import {SeoService} from "./seo.service";

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    FiltersComponent,
    ProductComponent,
    CartComponent,
    ProductThumbnailComponent,
    SortFiltersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    SeoService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
