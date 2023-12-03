import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/common/product';
import { AdditionalItem } from 'src/app/common/AdditionalItem';
import { AdditionalItemsService } from 'src/app/services/additional-items.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from 'src/app/common/product-category';
import { forkJoin } from 'rxjs';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedService } from 'src/app/common/shared.service';
import { Route, Router } from '@angular/router';

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
  selectedAdditionItems: { [productId: string]: any[] } = {};
  totalAdditionalPrice = 0;
  listOfAdditionItems: any; 

  cartItem!:CartItem;

  storage: Storage = sessionStorage;
  productCategory:ProductCategory;

  toppings = new FormControl();


  constructor(private cartService: CartService,private productService:ProductService, private additionItemService:AdditionalItemsService,private sharedService: SharedService, private router:Router) { // Assuming tempCartItem is available in this component
  const tempCartItem = this.cartItems;

  // Send data to the shared service
  // this.sharedService.sendTempCartItem(tempCartItem);
    this.productCategory = {} as ProductCategory;
  
}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
  
    this.cartItems.forEach(cartItem => {
      const url = cartItem.category.href;
    
      // Subscribe to getProductCategory and assign the result to cartItem.category
      this.productService.getProductCategory(url).subscribe(
        (productCategory: ProductCategory) => {
          cartItem.category = productCategory;
          this.additionItemService.getAdditionalItemsForProductCategory(productCategory).subscribe
                (data=>{
                  cartItem.additionalItems = data;
                }
            ,
    (error:any)=>{
      console.error(error);
    })

        },
        error => {
          console.error(error);
        }
      );
    });  
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

  addAdditionItem(item: any,tempCartItem:CartItem) {
    if (!this.checkForDuplicate(tempCartItem, item)) {
      this.increaseTotalPrice(item.price);
      tempCartItem.selectedAdditionalItems = tempCartItem.selectedAdditionalItems || [];
      tempCartItem.selectedAdditionalItems.push(item);
      this.getTotalAdditionalPrice();
    }
  }

  // 

  public getAllAdtionItemService(productCategory:ProductCategory){
    // this.listOfAdditionItems=[]=[];
    console.log("getAllAdditionItem RUnning");
   return this.additionItemService.getAdditionalItemsForProductCategory(productCategory).subscribe
    (data=>{
     return data;
    }
,
    (error:any)=>{
      return null;
    })
    return null;
  }

  removeFromAdditionItemSelected(tempCartItem: CartItem, item: any) {
    const index = tempCartItem.selectedAdditionalItems?.indexOf(item);
    if (index !== -1) {
      this.decreacePriceWhenAdditionItemRemove(item.price);
      tempCartItem.selectedAdditionalItems.splice(index, 1);
      this.getTotalAdditionalPrice();
    }
  }
  
  checkInSelection(item: any): boolean {
    return this.selectedAdditionalItems.includes(item);
  }

  checkForDuplicate(tempCartItem: CartItem, item: any): boolean {
    return tempCartItem.selectedAdditionalItems?.some((selectedItem: { id: any; }) => selectedItem.id === item.id);
  }

  public getTotalAdditionalPrice(){
    let price = this.storage.getItem("totalPrice");
    this.totalPrice =  parseFloat(price || "0"); 
  }

  public increaseTotalPrice(price:number){
    let oldPriceString = this.storage.getItem("totalPrice");
    let oldPrice = parseFloat(oldPriceString || "0"); // Use a default value if the string is null or undefined
    oldPrice = oldPrice + price; // or oldPrice += price;
    let newPriceAsString = oldPrice.toString();
    this.storage.setItem("totalPrice", newPriceAsString);
} 

public decreacePriceWhenAdditionItemRemove(price:number){
      let oldPriceString = this.storage.getItem("totalPrice");
      let oldPrice = parseFloat(oldPriceString || "0"); // Use a default value if the string is null or undefined
      oldPrice = oldPrice - price; // or oldPrice += price;
      let newPriceAsString = oldPrice.toString();
      this.storage.setItem("totalPrice", newPriceAsString);

  }
  
  public getProductCategory(url:any) {

    this.productService.getProductCategory(url).subscribe(
      data => {
        console.log(data);
        this.productCategory = data;
        this.getAllAdtionItemService(this.productCategory);

      },
      error => {
        this.productCategory = {} as ProductCategory;
      }
    );
  }

  handleSelectionChange(t:CartItem) {
    // Iterate through selected items and add them to the selection
    this.selectedAdditionItems[t.id].forEach(item => {
      if (!this.checkInSelection(item)) {
        this.addAdditionItem(item,t);
        
      }
    });
  
    // Iterate through previously selected items and remove them from the selection
    t.additionalItems.forEach(selectedItem => {
      if (!this.selectedAdditionItems[t.id].includes(selectedItem)) {
        this.removeFromAdditionItemSelected(t,selectedItem);
      }
    });
  }

  public toOrderPlace(){
      const tempCartItem = this.cartItems;
      this.sharedService.sendTempCartItem(tempCartItem)
      this.router.navigate(['/checkout'])
  }
  
  
} 
