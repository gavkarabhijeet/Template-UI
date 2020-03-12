import { TestBed } from '@angular/core/testing';

import { MakerComponentService } from './maker-component.service';

describe('MakerComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MakerComponentService = TestBed.get(MakerComponentService);
    expect(service).toBeTruthy();
  });
});
