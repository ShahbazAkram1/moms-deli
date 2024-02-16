import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalItemsComponent } from './additional-items.component';

describe('AdditionalItemsComponent', () => {
  let component: AdditionalItemsComponent;
  let fixture: ComponentFixture<AdditionalItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalItemsComponent]
    });
    fixture = TestBed.createComponent(AdditionalItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
