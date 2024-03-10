import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/common/product';
import { AdditionalItem } from 'src/app/common/AdditionalItem';
import { AdditionalItemsService } from 'src/app/services/additional-items.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from 'src/app/common/product-category';
import { Subscription, forkJoin } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from 'src/app/common/shared.service';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { BreadOption } from 'src/app/common/BreadOption';
import { BreadOptionsService } from 'src/app/services/BreadOptionsService';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingPrice: number = 5.0;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  description: string = '';
  product!: Product[];
  selectedAdditionalItems: AdditionalItem[] = [];
  selectedAdditionItems: { [productId: string]: any[] } = {};
  selectedBreadOption: BreadOption[] = [];
  selectedBreadOptions: { [productId: string]: BreadOption[] } = {};


  totalAdditionalPrice = 0;
  listOfAdditionItems: any;

  cartItem!: CartItem;

  storage: Storage = sessionStorage;
  productCategory: ProductCategory;

  toppings = new FormControl();

  constructor(
    public cartService: CartService,
    private productService: ProductService,
    private additionItemService: AdditionalItemsService,
    private breadOptionService: BreadOptionsService, 
    private sharedService: SharedService,
    private router: Router,
    private authService:AuthService
  ) {
    // Assuming tempCartItem is available in this component
    const tempCartItem = this.cartItems;

    // Send data to the shared service
    // this.sharedService.sendTempCartItem(tempCartItem);
    this.productCategory = {} as ProductCategory;
  }
  private cartSubscription!: Subscription;
  ngOnInit(): void {
      // Subscribe to the cart items
      // Subscribe to the total price
   
    this.listCartDetails();
  }
  // mo warro he codepaste kaiyw ada ??

  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.getCart();
  this.totalPrice = this.cartService.computeTotalPrice();
    this.cartItems.forEach((cartItem) => {
        console.log(cartItem);
          this.additionItemService
            .getAdditionalItemsForProductCategory(cartItem.category)
            .subscribe(
              (data) => {
                cartItem.additionalItems = data;
              },
              (error: any) => {
                console.error(error);
              }
            );
            this.breadOptionService
            .getBreadOptionsForProductCategory(cartItem.category)
            .subscribe(
                (data) => {
                  console.log(data);
                    cartItem.breadOptions = data;
                },
                (error: any) => {
                    console.error(error);
                }
            );
        });
       
     
   
    // this.selectedAdditionalItems = this.cartItems.map(item => item.selectedAdditionalItems).flat();

    // subscribe to the cart totalPrice
    // this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    // subscribe to the cart totalQuantity
    // this.cartService.totalQuantity.subscribe(
    //   (data) => (this.totalQuantity = data)
    // );

    // compute cart total price and quantity
    // this.cartService.computeCartTotals();
  }
  

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    // this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.removeFromCart(theCartItem.id);
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartService.computeTotalPrice();
  }

  addAdditionItem(item: any, tempCartItem: CartItem) {
    console.log(item.price);
    if (!this.checkForDuplicate(tempCartItem, item)) {
      this.increaseTotalPrice(item.price);
      tempCartItem.selectedAdditionalItems =
        tempCartItem.selectedAdditionalItems || [];
      tempCartItem.selectedAdditionalItems.push(item);
      this.getTotalAdditionalPrice();
    }
  }

  //

  public getAllAdtionItemService(productCategory: ProductCategory) {
    // this.listOfAdditionItems=[]=[];
    console.log('getAllAdditionItem RUnning');
    return this.additionItemService
      .getAdditionalItemsForProductCategory(productCategory)
      .subscribe(
        (data) => {
          return data;
        },
        (error: any) => {
          return null;
        }
      );
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
    return tempCartItem.selectedAdditionalItems?.some(
      (selectedItem: { id: any }) => selectedItem.id === item.id
    );
  }

  public getTotalAdditionalPrice() {
    let price = this.storage.getItem('totalPrice');
    this.totalPrice = parseFloat(price || '0');
  }

  public increaseTotalPrice(price: number) {
    let oldPriceString = this.storage.getItem('totalPrice');
    let oldPrice = parseFloat(oldPriceString || '0'); // Use a default value if the string is null or undefined
    oldPrice = oldPrice + price; // or oldPrice += price;
    let newPriceAsString = oldPrice.toString();
    this.storage.setItem('totalPrice', newPriceAsString);
  }

  public decreacePriceWhenAdditionItemRemove(price: number) {
    let oldPriceString = this.storage.getItem('totalPrice');
    let oldPrice = parseFloat(oldPriceString || '0'); // Use a default value if the string is null or undefined
    oldPrice = oldPrice - price; // or oldPrice += price;
    let newPriceAsString = oldPrice.toString();
    this.storage.setItem('totalPrice', newPriceAsString);
  }

  // handleSelectionChange(t: CartItem) {
  //   // Iterate through selected items and add them to the selection
  //   this.selectedAdditionItems[t.id].forEach((item) => {
  //     if (!this.checkInSelection(item)) {
  //       this.addAdditionItem(item, t);
  //     }
  //   });

  //   // Iterate through previously selected items and remove them from the selection
  //   t.additionalItems.forEach((selectedItem) => {
  //     if (!this.selectedAdditionItems[t.id].includes(selectedItem)) {
  //       this.removeFromAdditionItemSelected(t, selectedItem);
  //     }
  //   });
  // }

  handleSelectionChange(cartItem: CartItem) {
    console.log(cartItem);
      this.increaseTotalPrice(cartItem.price);
      this.getTotalAdditionalPrice();



    // Handle selection change for additional items
    this.selectedAdditionItems[cartItem.id]?.forEach((item) => {
      if (!this.checkForDuplicate(cartItem, item)) {
        console.log("NOT DUPLICATED");
        this.addAdditionItem(item, cartItem);
      }else{
        console.log("DUPLOCAYES");
      }
    });
  
  }
  

  handleBreadOptionChange(cartItem: CartItem) {
  console.log(cartItem);
    this.selectedAdditionItems[cartItem.id]?.forEach((item) => {
      if (!this.checkForDuplicateBread(cartItem, item)) {
        this.selectedBreadOptionsM(item, cartItem);
      }
    });
    this.selectedBreadOptions[cartItem.id] = cartItem.breadOptions.filter(option => option.selected);
  }
  
  checkForDuplicateBread(tempCartItem: CartItem, item: any): boolean {
    return tempCartItem.breadOptions?.some(
      (selectedItem: { id: any }) => selectedItem.id === item.id
    );
  }
  selectedBreadOptionsM(item: any, tempCartItem: CartItem) {
    if (!this.checkForDuplicateBread(tempCartItem, item)) {
      this.increaseTotalPrice(item.price);
      tempCartItem.breadOptions =
        tempCartItem.breadOptions || [];
      tempCartItem.breadOptions.push(item);
      this.getTotalAdditionalPrice();
    }
  }


  public toOrderPlace() {
   if(this.authService.isLoggedIn()){
    const tempCartItem = this.cartItems;
    this.sharedService.sendTempCartItem(tempCartItem);
    this.router.navigate(['/checkout']);
   }else{
    this.sharedService.sendAnyData("Please Login First...");
    this.router.navigate(['/auth/login']);
   }
  }
}
