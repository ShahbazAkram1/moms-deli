import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdditionalItemsComponent } from './edit-additional-items.component';

describe('EditAdditionalItemsComponent', () => {
  let component: EditAdditionalItemsComponent;
  let fixture: ComponentFixture<EditAdditionalItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAdditionalItemsComponent]
    });
    fixture = TestBed.createComponent(EditAdditionalItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
