import { TestBed } from '@angular/core/testing';

import { TechTreeDrawService } from './tech-tree-draw.service';

describe('TechTreeDrawService', () => {
  let service: TechTreeDrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechTreeDrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
