import { TestBed } from '@angular/core/testing';

import { DummyServerService } from './dummy-server.service';

describe('DummyServerService', () => {
  let service: DummyServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
