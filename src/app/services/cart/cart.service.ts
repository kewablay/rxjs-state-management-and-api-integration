import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { CartItem } from '../../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$ = new BehaviorSubject<CartItem[]>([]);
  cartTotal$ = new BehaviorSubject<number>(0);

  constructor() {
    // this.cartTotal$ = this.cart$.pipe(
    //   map(items => items.length)
    // ) as BehaviorSubject<number>

    this.cartTotal$ = this.cart$.pipe(
      map((items) => {
        return items.reduce((prev, current) => prev + current.quantity, 0);
      })
    ) as BehaviorSubject<number>;
  }

  getCartItems() {
    return this.cart$;
  }

  addItemToCart(item: CartItem) {
    const cart = this.cart$.value;
    const itemInCart = this.cart$.value.find((i) => i.id === item.id);
    if (itemInCart) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      // const updatedCart = cart.map((cartItem) => {
      //   if (cartItem.id === item.id) {
      //     return { ...cartItem, quantity: cartItem.quantity + 1 };
      //   }
      //   return cartItem;
      // })
      this.cart$.next(updatedCart);
      // itemInCart.quantity++;
    } else {
      this.cart$.next([...this.cart$.value, item]);
    }
  }

  decreaseQuantity(itemId: string) {
    const cart = this.cart$.value;
    const itemInCart = this.cart$.value.find((i) => i.id === itemId);
    if (itemInCart && itemInCart.quantity > 1) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === itemId) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      });

      this.cart$.next(updatedCart);
    } else {
      this.removeItem(itemId);
    }
  }

  removeItem(productId: string) {
    const updatedCart = this.cart$.value.filter(
      (item) => item.id !== productId
    );
    this.cart$.next(updatedCart);
  }

  clearCart() {
    this.cart$.next([]);
  }

  getTotal() {
    return this.cartTotal$;
  }
}
