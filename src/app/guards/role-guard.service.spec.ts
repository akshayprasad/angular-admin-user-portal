import { TestBed, inject } from '@angular/core/testing';

import { RoleGuardService } from './role-guard.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoleGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [RoleGuardService]
    })
    .compileComponents();
  });

  it('should be created', inject([RoleGuardService], (service: RoleGuardService) => {
    expect(service).toBeTruthy();
  }));
});
