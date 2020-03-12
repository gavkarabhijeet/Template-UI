import { TestBed } from '@angular/core/testing';

import { CmsComponentService } from './cms-component.service';

describe('CmsComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmsComponentService = TestBed.get(CmsComponentService);
    expect(service).toBeTruthy();
  });
});
