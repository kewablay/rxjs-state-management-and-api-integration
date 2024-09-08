import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [AsyncPipe, ProductItemComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.sass',
})
export class ProductsListComponent {
  products$: Observable<any[]>;

  constructor(private productsService: ProductsService) {
    this.products$ = this.productsService.getProducts();
  }

  ngOnInit() {}
}
