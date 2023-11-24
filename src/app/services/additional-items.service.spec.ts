import { TestBed } from '@angular/core/testing';

import { AdditionalItemsService } from './additional-items.service';

describe('AdditionalItemsService', () => {
  let service: AdditionalItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
