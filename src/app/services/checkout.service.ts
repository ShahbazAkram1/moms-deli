import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  // AWS EC2 URLs
  // private purchaseUrl = 'https://api.momsdelionline.com/api/checkout/purchase';
  // private paymentIntentUrl = 'https://api.momsdelionline.com/api/checkout/payment-intent';

  private purchaseUrl = 'http://localhost:8081/api/checkout/purchase';
  private paymentIntentUrl = 'http://localhost:8081/api/checkout/payment-intent';

  // old AWS EC2 URLs
  // private purchaseUrl = 'http://momsdelionline.com:8080/api/checkout/purchase';
  // private paymentIntentUrl = 'http://momsdelionline.com:8080/api/checkout/payment-intent';
  // private purchaseUrl = 'http://3.83.92.87:8080/api/checkout/purchase';
  // private paymentIntentUrl = 'http://3.83.92.87:8080/api/checkout/payment-intent';
  // private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';
  // private paymentIntentUrl = 'http://localhost:8080/api/checkout/payment-intent';
// private purchaseUrl = 'http://momsdeli.us-east-1.elasticbeanstalk.com/api/checkout/purchase';
  // private purchaseUrl = 'http://momsdeli.us-east-1.elasticbeanstalk.com/api/checkout/purchase';
  // private paymentIntentUrl = 'http://momsdeli.us-east-1.elasticbeanstalk.com/api/checkout/payment-intent';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);    
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }
  
}
