import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MomsDeliFormService } from 'src/app/services/moms-deli-form.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { MomsDeliValidators } from 'src/app/validators/moms-deli-validators';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { PaymentInfo } from 'src/app/common/payment-info';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/common/shared.service';
import { CartItem } from 'src/app/common/cart-item';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit,AfterViewInit {

  checkoutFormGroup!: FormGroup;

  shippingPrice: number = 5.00;
  totalPrice: number = 0;
  // totalQuantity: number = this.cartService.getCart().length;

  totalQuantity: number = 0;
  
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  @ViewChild('stepper') stepper!: MatStepper;

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  stripe = Stripe(environment.stripePublishableKey);
  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";
  receivedTempCartItem:any;
  storage: Storage = sessionStorage;
  selectedTab="customer"
  phoneNumber: any;
  constructor(private formBuilder: FormBuilder,
              private MomsDeliFormService: MomsDeliFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router,
              private sharedService: SharedService,
              private authService:AuthService
              ) { }
  ngAfterViewInit(): void {
    this.setupStripePaymentForm();
  }

              public changeTab(tab:string){
                this.selectedTab = tab;
              }
          
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.sharedService.sendAnyData("Please Login First...");
      this.router.navigate(['/auth/login']);
     }

    this.creditCardMonths = [];
    this.creditCardYears = [];
    this.countries = [];
    this.shippingAddressStates = [];
    this.billingAddressStates = [];
    this.displayError = "";

 
    // setup Stripe payment form




    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
                              [Validators.required,
                               Validators.minLength(2),
                               MomsDeliValidators.notOnlyWhitespace]),

        lastName:  new FormControl('',
                              [Validators.required,
                               Validators.minLength(2),
                               MomsDeliValidators.notOnlyWhitespace]),

        email: new FormControl('',
                              [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
                              phoneNumber: new FormControl('', [Validators.required])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),
                                     MomsDeliValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
                                   MomsDeliValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),
                                      MomsDeliValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),
                                     MomsDeliValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
                                   MomsDeliValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),
                                      MomsDeliValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
    //     cardType: new FormControl('', [Validators.required]),
    //     nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2),
    //                                       MomsDeliValidators.notOnlyWhitespace]),
    //     cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
    //     securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
    //     expirationMonth: [''],
    //     expirationYear: ['']
      })
    });

    // // populate credit card months

    // const startMonth: number = new Date().getMonth() + 1;
    // console.log("startMonth: " + startMonth);

    // this.MomsDeliFormService.getCreditCardMonths(startMonth).subscribe(
    //   data => {
    //     console.log("Retrieved credit card months: " + JSON.stringify(data));
    //     this.creditCardMonths = data;
    //   }
    // );

    // // populate credit card years

    // this.MomsDeliFormService.getCreditCardYears().subscribe(
    //   data => {
    //     console.log("Retrieved credit card years: " + JSON.stringify(data));
    //     this.creditCardYears = data;
    //   }
    // );

    // populate countries

    this.MomsDeliFormService.getCountries().subscribe(
      data => {
        console.log("REVEVING THE DATA");
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      },
      error => {
        console.log(error);
      }

      
    );

     this.cartService.cartItems$.subscribe(items => {
      this.totalQuantity = items.length;
    });
  }

  setupStripePaymentForm() {

    // get a handle to stripe elements
    var elements = this.stripe.elements();

    // Create a card element ... and hide the zip-code field
    this.cardElement = elements.create('card', { hidePostalCode: true });

    // Add an instance of card UI component into the 'card-element' div
    this.cardElement.mount('#card-element');

    // Add event binding for the 'change' event on the card element
    this.cardElement.on('change', (event: { complete: any; error: { message: any; }; }) => {

      // get a handle to card-errors element
      this.displayError = document.getElementById('card-errors');
          console.log(event);
      if (event.complete) {
        console.log(event.complete);
        // this.displayError.textContent = "";
      } else if (event.error) {
        console.log(event.error);
        // show validation error to customer
        // this.displayError.textContent = event.error.message;
      }

    });

  }


  reviewCartDetails() {

    // subscribe to cartService.totalQuantity
    // this.cartService.totalQuantity.subscribe(
    //   totalQuantity => this.totalQuantity = totalQuantity
    // );
     
    this.totalPrice  = this.cartService.computeTotalPrice()+ 5;

    // subscribe to cartService.totalPrice
    // this.cartService.totalPrice.subscribe(
    //   totalPrice => this.totalPrice = totalPrice
    // );
    

  }
  async handleFormSubmission() {
    const { token, error } = await this.stripe.createToken(this.cardElement);
    if (error) {
      console.error(error);
    } else {
      this.sendTokenToServer(token.id);
    }
  }
  
  sendTokenToServer(token: string) {
  }
  

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }



  // copyShippingAddressToBillingAddress(event: Event) {
  //   const checkbox = event.target as HTMLInputElement;
  
  //   if (checkbox.checked) {
  //     this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
  //     // bug fix for states
  //     this.billingAddressStates = this.shippingAddressStates;
  //   } else {
  //     this.checkoutFormGroup.controls['billingAddress'].reset();
  //     // bug fix for states
  //     this.billingAddressStates = [];
  //   }
  // }

  copyShippingAddressToBillingAddress(checked: boolean) {
    if (checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      // bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      // bug fix for states
      this.billingAddressStates = [];
    }
  }
  
  isPurchasing = false;

  onSubmit() {
    this.isPurchasing = true;

    if (this.checkoutFormGroup.invalid) {
      this.isPurchasing = false;

      this.checkoutFormGroup.markAllAsTouched();
      Swal.fire({
        icon:'error',
        text:'All Fields are required Fill ALl The Fields!'
        
      });
        return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.getCart();

    // create orderItems from cartItems
    // - long way
      this.receivedTempCartItem =  this.cartService.getCart();
  

    // - short way of doing the same thingy
    // let orderItems:OrderItem[] = (this.receivedTempCartItem as CartItem[]).map(t => new OrderItem(t));
    // console.log(orderItems);

    let orderItems: OrderItem[] = (this.receivedTempCartItem as CartItem[]).map(cartItem => {
      console.log("CartItem: ", cartItem);
      console.log("Selected Additional Items: ", cartItem.selectedAdditionalItems);
  
      let orderItem = new OrderItem(cartItem);
      orderItem.additionalItems = cartItem.selectedAdditionalItems; // Assuming selectedAdditionalItems holds the selected additional items
      console.log("Created OrderItem: ", orderItem);
      return orderItem;
    });
    console.log(orderItems);


    // set up purchase
    let purchase = new Purchase();
    purchase.orderItems = orderItems;
    
    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    
    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;
  
    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // compute payment info
  
    
    this.paymentInfo.amount = this.totalPrice * 100;
    this.paymentInfo.currency = "USD";

    console.log(purchase);

    if (!this.checkoutFormGroup.invalid) {
      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement
              }
            }, { handleActions: false })
          .then((result: { error: { message: any; }; }) => {
            if (result.error) {
              // inform the customer there was an error
              
              this.isPurchasing = false;;

              Swal.fire({
                icon:'error',
                text:`There was an error: ${result.error.message}`

              })
            } else {
              // call REST API via the CheckoutService
              console.log("ELse Calling");
              this.checkoutService.placeOrder(purchase).subscribe(
                {
                next: response => {
                  Swal.fire({
                    title: "Your Order Replaced Successfully",
                    text: `Order tracking number: ${response.orderTrackingNumber}`,
                    imageUrl: "../../../assets/images/order_confirmed.png",
                    imageWidth: 400,
                    imageHeight: 200,
                  });
                  this.cartService.clearCart();;
                  this.isPurchasing = false;


                  // reset cart
                  // this.resetCart();
                },
                error: err => {
                  this.isPurchasing = false;;

                  Swal.fire({
                    icon:'error',
                    text:`There was an error: ${result.error.message}`
    
                  })
                
                }
              })
            }
            });            
          // }bind(this));
        }
      );
    } else {
      console.log("NOT PAYING")
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

  }

  resetCart() {
    // reset cart data
    this.cartService.clearCart();
    
    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    // this.router.navigateByUrl("/products");
  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup!.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.MomsDeliFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {
 
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup!.value.country.code;
    const countryName = formGroup!.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.MomsDeliFormService.getStates(countryCode).subscribe(
      data => {
          console.log(data);
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data; 
        }
        else {
          console.log("SOMETHING WENT TO WRONG");
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup!.get('state')!.setValue(data[0]);
      },
      error=>{
        console.log(error);
      }
    );
  }

  // totalPrice=0;
  // updateCartStatus() {

  //   // subscribe to the cart totalPrice
  //   this.cartService.totalPrice.subscribe(
  //     data => this.totalPrice = data
  //   );

  onNext() {
    if (this.checkoutFormGroup.valid) {
      this.stepper.next();
    }
  }

  // Method to handle the "Previous" button click
  onPrevious() {
    this.stepper.previous();
  }

}
