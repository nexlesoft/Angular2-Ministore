import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Category} from '../model/category.model'

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input()
  categories: Category[]

  @Input()
  marriedFilters: any[]

  @Input()
  sexFilters: any[]

  @Input()
  priceFilters: any[]

  @Output()
  onFilterChange = new EventEmitter<any>()

  showFilters: boolean = true

  sideShown: boolean = false

  constructor() {
  }

  ngOnInit() {
  }

  reset(marriedFilters, sexFilters, priceFilters) {
    this.marriedFilters = marriedFilters
    this.sexFilters = sexFilters
    this.priceFilters = priceFilters
    this.showFilters = false
    setTimeout(() => {
      this.showFilters = true
    });
  }

  onInputChange($event, filter, type) {
    let change = $event.target.checked ? 1 : -1
    this.onFilterChange.emit({
      type: type,
      filter: filter,
      isChecked: $event.target.checked,
      change: change
    })
  }
}
