// cart.service.ts
import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
// import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];
  private totalPriceSource = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPriceSource.asObservable();
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();



  constructor(private toastrService: ToastrService) {
    this.loadCart();
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(item: CartItem): void {
    console.log(item);
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.toastrService.success(`${item.name} Increased Quantity Successfully to Cart.`);
    } else {
      this.cart.push(item);
      this.toastrService.success(`${item.name} Added Successfully to Cart.`);
    }

    this.saveCart();
  }

  removeFromCart(itemId: string): void {
    this.cart = this.cart.filter((item) => item.id !== itemId);
    this.saveCart();
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
    localStorage.removeItem('cart');
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCart(): void {
    const cartData = localStorage.getItem('cart');
    this.cart = cartData ? JSON.parse(cartData) : [];
  }
  public computeTotalPrice() {
    const totalPrice = this.cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return totalPrice;
    
  }
}
