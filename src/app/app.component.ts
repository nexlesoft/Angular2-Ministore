import {Component, OnInit} from '@angular/core';
import {Product} from './model/product.model';
import {CartService} from './cart.service';
import {ViewChild} from '@angular/core';

import {FiltersComponent} from './filters/filters.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {SeoService} from "./seo.service";

import {DATA} from "./mock-data";
import {SEO_DATA} from "./mock-seo-data";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: Product[]
  mainFilter: any
  currentSorting: string
  @ViewChild('filtersComponent')
  filtersComponent: FiltersComponent;
  @ViewChild('searchComponent')
  searchComponent: SearchBarComponent;
  sortFilters: any[] = [
    {name: 'Name (A to Z)', value: 'name'},
    {name: 'Price (low to high)', value: 'priceAsc'},
    {name: 'Price (high to low)', value: 'priceDes'}
  ]
  marriedFilters: any[] = [
    {name: 'Độc Thân', value: 1, checked: true},
    {name: 'Có Gia Đình', value: 0, checked: false},
    {name: 'Khác', value: 2, checked: false}
  ]
  sexFilters: any[] = [
    {name: 'Nam', value: 1, checked: true},
    {name: 'Nữ', value: 0, checked: false}
  ]
  priceFilters: any[];
  storeData: any = [];

  constructor(private seoService: SeoService, private cartService: CartService) {
    seoService.setMetaDescription('Shop with Angular2');

    // FIXME: SEO_DATA should be generate from storeData
    seoService.setScriptElement('application/ld+json', JSON.stringify(SEO_DATA));
  }

  ngOnInit() {
    this.storeData = DATA;
    let averagePrice = this.getAveragePrice();
    this.priceFilters = [
      {name: 'Tất Cả', value: 'all', checked: true},
      {name: '>= ' + averagePrice, value: 'more_' + averagePrice, checked: false},
      {name: '< ' + averagePrice, value: 'less_' + averagePrice, checked: false}
    ];
    this.mainFilter = {
      search: '',
      categories: this.storeData.categories.slice(0),
      marriedFilter: this.marriedFilters[0],
      sexFilter: this.sexFilters[0],
      priceFilter: this.priceFilters[0]
    }
    //Make a deep copy of the original data to keep it immutable
    this.products = this.storeData.products.slice(0)
    this.sortProducts('name');
    this.updateProducts({type: ''});
  }

  private getAveragePrice() {
    let minPrice = 0;
    let maxPrice = 0;
    this.storeData.products.forEach(product => {
      let tmpPrice = parseFloat(product.price.replace(/\./g, '').replace(',', '.'))
      // let tmpPrice = product.price;
      if (!minPrice || minPrice > tmpPrice) {
        minPrice = tmpPrice;
      }
      if (!maxPrice || maxPrice < tmpPrice) {
        maxPrice = tmpPrice;
      }
    });
    let averagePrice = (minPrice + maxPrice) / 2;
    return averagePrice;
  }

  onSearchChange(search) {
    this.mainFilter.search = search.search
    this.updateProducts({
      type: 'search',
      change: search.change
    })
  }

  onFilterChange(data) {
    if (data.type == 'category') {
      if (data.isChecked) {
        this.mainFilter.categories.push(data.filter)
      } else {
        this.mainFilter.categories = this.mainFilter.categories.filter(category => {
          return category.id != data.filter.id
        })
      }
    } else if (data.type == 'married') {
      this.mainFilter.marriedFilter = data.filter
    } else if (data.type == 'sex') {
      this.mainFilter.sexFilter = data.filter
    } else if (data.type == 'price') {
      this.mainFilter.priceFilter = data.filter
    }
    this.updateProducts({
      type: data.type,
      change: data.change
    })
  }

  updateProducts(filter) {
    let productsSource = this.storeData.products
    let prevProducts = this.products
    let filterAllData = true
    if ((filter.type == 'search' && filter.change == 1) || (filter.type == 'category' && filter.change == -1)) {
      productsSource = this.products
      filterAllData = false
    }
    this.products = productsSource.filter(product => {
      //Filter by search
      if (filterAllData || filter.type == 'search') {
        if (!product.name.match(new RegExp(this.mainFilter.search, 'i'))) {
          return false;
        }
      }
      //Filter by categories
      if (filterAllData || filter.type == 'category') {
        let passCategoryFilter = false
        product.categories.forEach(product_category => {
          if (!passCategoryFilter) {
            passCategoryFilter = this.mainFilter.categories.reduce((found, category) => {
              return found || product_category == category.id
            }, false)
          }
        })
        if (!passCategoryFilter) {
          return false
        }
      }
      //Filter by married filters
      if (filterAllData || filter.type == 'married') {
        let passMarriedFilter = false
        let marriedFilter = this.mainFilter.marriedFilter.value
        if (marriedFilter == 'all') {
          passMarriedFilter = true;
        } else if (marriedFilter == product.married) {
          passMarriedFilter = true;
        }
        if (!passMarriedFilter) {
          return false
        }
      }
      //Filter by sex filters
      if (filterAllData || filter.type == 'sex') {
        let passSexFilter = false
        let sexFilter = this.mainFilter.sexFilter.value
        if (sexFilter == 'all') {
          passSexFilter = true;
        } else if (sexFilter == 1 && product.sex) {
          passSexFilter = true;
        } else if (sexFilter == 0 && !product.sex) {
          passSexFilter = true;
        }
        if (!passSexFilter) {
          return false
        }
      }
      //Filter by price filters
      if (filterAllData || filter.type == 'price') {
        let passPriceFilter = false
        let priceFilter = this.mainFilter.priceFilter.value;
        let productPrice = parseFloat(product.price.replace(/\./g, '').replace(',', '.'))
        if (priceFilter == 'all') {
          passPriceFilter = true;
        } else {
          let re = /([a-z]+)_([0-9]+)/i;
          let found = priceFilter.match(re);
          if (found) {
            if (found[1] == 'more' && productPrice >= found[2]) {
              passPriceFilter = true;
            } else if (found[1] == 'less' && productPrice < found[2]) {
              passPriceFilter = true;
            }
          }
        }
        if (!passPriceFilter) {
          return false
        }
      }
      return true
    })
    //If the number of products increased after the filter has been applied then sort again
    //If the number of products remained equal, there's a high chance that the items have been reordered.
    if (prevProducts.length <= this.products.length && this.products.length > 1) {
      this.sortProducts(this.currentSorting)
    }
    //These two types of filters usually add new data to the products showcase so a sort is necessary
    if (filter.type == 'custom' || filter.type == 'price') {
      this.sortProducts(this.currentSorting)
    }
  }

  sortProducts(criteria) {
    this.products.sort((a, b) => {
      let priceComparison = parseFloat(a.price.replace(/\./g, '').replace(',', '.')) - parseFloat(b.price.replace(/\./g, '').replace(',', '.'))
      if (criteria == 'priceDes') {
        return -priceComparison
      } else if (criteria == 'priceAsc') {
        return priceComparison
      } else if (criteria == 'name') {
        let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB)
          return -1;
        if (nameA > nameB)
          return 1;
        return 0;
      } else {
        //Keep the same order in case of any unexpected sort criteria
        return -1
      }
    })
    this.currentSorting = criteria
  }
}
