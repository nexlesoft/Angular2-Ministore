import {Component, OnInit, Input} from '@angular/core';
import {Product} from '../model/product.model'
import {CartService} from '../cart.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() products: Product[]

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
  }
}
