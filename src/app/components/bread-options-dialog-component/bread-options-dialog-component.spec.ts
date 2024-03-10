import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadOptionsDialogComponent } from './bread-options-dialog-component';

describe('BreadOptionsDialogComponent', () => {
  let component: BreadOptionsDialogComponent;
  let fixture: ComponentFixture<BreadOptionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadOptionsDialogComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests here to cover component functionality
});
