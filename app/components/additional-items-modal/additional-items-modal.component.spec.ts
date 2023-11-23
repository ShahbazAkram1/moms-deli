import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalItemsModalComponent } from './additional-items-modal.component';

describe('AdditionalItemsModalComponent', () => {
  let component: AdditionalItemsModalComponent;
  let fixture: ComponentFixture<AdditionalItemsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalItemsModalComponent]
    });
    fixture = TestBed.createComponent(AdditionalItemsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
