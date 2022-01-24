import { TestBed } from '@angular/core/testing';

import { BackgroundDrawService } from './background-draw.service';

describe('BackgroundDrawService', () => {
  let service: BackgroundDrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundDrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
