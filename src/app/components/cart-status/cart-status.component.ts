import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css'],
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.0;
  shippingPrice: number = 5.0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}
  storage: Storage = sessionStorage;

  ngOnInit(): void {
    this.updateCartStatus();
    if(this.totalQuantity==0){
      this.totalPrice = 0;
      this.storage.removeItem("totalPrice");
    }
  }

  updateCartStatus() {
    // subscribe to the cart totalPrice
    let price = this.storage.getItem('totalPrice');
    this.totalPrice = parseFloat(price || '0');

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

  }
}
