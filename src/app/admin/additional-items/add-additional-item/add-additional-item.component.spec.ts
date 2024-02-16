import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdditionalItemComponent } from './add-additional-item.component';

describe('AddAdditionalItemComponent', () => {
  let component: AddAdditionalItemComponent;
  let fixture: ComponentFixture<AddAdditionalItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdditionalItemComponent]
    });
    fixture = TestBed.createComponent(AddAdditionalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
