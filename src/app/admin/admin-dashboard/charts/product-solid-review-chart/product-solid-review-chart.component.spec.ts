import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSolidReviewChartComponent } from './product-solid-review-chart.component';

describe('ProductSolidReviewChartComponent', () => {
  let component: ProductSolidReviewChartComponent;
  let fixture: ComponentFixture<ProductSolidReviewChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSolidReviewChartComponent]
    });
    fixture = TestBed.createComponent(ProductSolidReviewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
