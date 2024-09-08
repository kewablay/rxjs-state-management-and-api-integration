import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart.model';
import { AsyncPipe } from '@angular/common';
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AsyncPipe, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.sass',
})
export class CartComponent {
  cart$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.getCartItems();
    this.cartTotal$ = this.cartService.getTotal();
  }

 

  clearCart() {
    this.cartService.clearCart();
  }
}
