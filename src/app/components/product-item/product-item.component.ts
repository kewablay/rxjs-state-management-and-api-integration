import { Component, Input } from '@angular/core';
import { Product } from '../../models/products.model';
import { CartService } from '../../services/cart/cart.service';
import { CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [ CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.sass',
})
export class ProductItemComponent {
  @Input() product!: Product;

  // singleRating = this.product.rating

  ratings = [...Array(4)]

  constructor(private cartService: CartService) {
    console.log("rating: ", this.product?.name)
  }

  getStarArray(rating: number): string[] {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Number of half stars
    const emptyStars = 5 - fullStars - halfStars; // Remaining stars are empty
  
    return [
      ...Array(fullStars).fill('full'), // Add full stars
      ...Array(halfStars).fill('half'), // Add half star if needed
      ...Array(emptyStars).fill('empty') // Add empty stars
    ];
  }
  

  addToCart(product: Product) {
    console.log('product:', product.name);
    this.cartService.addItemToCart({ ...product, quantity: 1 });
  }
}
