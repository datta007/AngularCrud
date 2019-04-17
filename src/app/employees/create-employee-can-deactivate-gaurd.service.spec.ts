import { TestBed } from '@angular/core/testing';

import { CreateEmployeeCanDeactivateGaurdService } from './create-employee-can-deactivate-gaurd.service';

describe('CreateEmployeeCanDeactivateGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateEmployeeCanDeactivateGaurdService = TestBed.get(CreateEmployeeCanDeactivateGaurdService);
    expect(service).toBeTruthy();
  });
});
