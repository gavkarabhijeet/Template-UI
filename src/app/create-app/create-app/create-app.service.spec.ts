import { TestBed } from '@angular/core/testing';

import { CreateAppService } from './create-app.service';

describe('CreateAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateAppService = TestBed.get(CreateAppService);
    expect(service).toBeTruthy();
  });
});
