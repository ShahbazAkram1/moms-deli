import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/common/product';
import { AdditionalItem } from 'src/app/common/AdditionalItem';
import { AdditionalItemsService } from 'src/app/services/additional-items.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  shippingPrice: number = 5.00;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  description: string = '';
  product!: Product[];
  selectedAdditionalItems: AdditionalItem[] = [];
  totalAdditionalPrice = 0;
  listOfAdditionItems: AdditionalItem[] = []; 

  constructor(private cartService: CartService, private additionItemService:AdditionalItemsService) { }

  ngOnInit(): void {
    this.listCartDetails();
    this.getAllAdtionItemService();
  }

  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    // this.selectedAdditionalItems = this.cartItems.map(item => item.selectedAdditionalItems).flat();

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe( 
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }

  addAdditoinItem(item: any) {
    // Add item to the selection
    this.selectedAdditionalItems.push(item);
  }

  // 
  public getAllAdtionItemService(){
    this.additionItemService.getAllAdditionalItem().subscribe
    (data=>{
        this.listOfAdditionItems = data;
    },
    
    (error:any)=>{
        console.log("There is an error");
    })
  }

  removeFromAdditionItemSelected(item: any) {
    const index = this.selectedAdditionalItems.indexOf(item);
    if (index !== -1) {
      this.selectedAdditionalItems.splice(index, 1);
    }
  }

  checkInSelection(item: any): boolean {
    return this.selectedAdditionalItems.includes(item);
  }

  public getTotalAdditionalPrice(){
    for(let item of this.selectedAdditionalItems){
      this.totalAdditionalPrice+=item.price;
    }
    return this.totalAdditionalPrice;
  }

}
