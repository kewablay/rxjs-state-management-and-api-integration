import { Component, Input, input } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.sass'
})
export class CartItemComponent {
  constructor(private cartService: CartService){}

  @Input() item!: CartItem;

  removeCartItem(id: string) {
    this.cartService.removeItem(id);
  }

  decreaseQuantity(id: string) {
    this.cartService.decreaseQuantity(id);
  }
  increaseQuantity(item: CartItem) {
    this.cartService.addItemToCart(item);
  }
}
