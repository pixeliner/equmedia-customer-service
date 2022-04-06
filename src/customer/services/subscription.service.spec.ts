import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
  let service: SubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [SubscriptionService],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
