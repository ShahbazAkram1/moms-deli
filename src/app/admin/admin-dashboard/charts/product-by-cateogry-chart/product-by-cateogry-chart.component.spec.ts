import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductByCateogryChartComponent } from './product-by-cateogry-chart.component';

describe('ProductByCateogryChartComponent', () => {
  let component: ProductByCateogryChartComponent;
  let fixture: ComponentFixture<ProductByCateogryChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductByCateogryChartComponent]
    });
    fixture = TestBed.createComponent(ProductByCateogryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
