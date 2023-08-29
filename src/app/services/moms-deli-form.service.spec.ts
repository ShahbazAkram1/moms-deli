import { TestBed } from '@angular/core/testing';

import { MomsDeliFormService } from './moms-deli-form.service';

describe('MomsDeliFormService', () => {
  let service: MomsDeliFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomsDeliFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
