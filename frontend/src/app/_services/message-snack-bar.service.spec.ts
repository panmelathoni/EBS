import { TestBed } from '@angular/core/testing';

import { MessageSnackBarService } from './message-snack-bar.service';

describe('MessageSnackBarService', () => {
  let service: MessageSnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageSnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
