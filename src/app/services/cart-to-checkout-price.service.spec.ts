import { TestBed } from '@angular/core/testing';

import { CartToCheckoutPriceService } from './cart-to-checkout-price.service';

describe('CartToCheckoutPriceService', () => {
  let service: CartToCheckoutPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartToCheckoutPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
