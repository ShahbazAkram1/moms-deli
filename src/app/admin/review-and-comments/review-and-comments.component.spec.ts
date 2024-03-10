import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAndCommentsComponent } from './review-and-comments.component';

describe('ReviewAndCommentsComponent', () => {
  let component: ReviewAndCommentsComponent;
  let fixture: ComponentFixture<ReviewAndCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewAndCommentsComponent]
    });
    fixture = TestBed.createComponent(ReviewAndCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
