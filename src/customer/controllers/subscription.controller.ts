import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ClaimEntity, SubscriptionEntity } from 'src/db/entities';
import { SubscriptionService } from '../services/subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @MessagePattern({ role: 'subscription', cmd: 'getAll' })
  async getSubscriptions(): Promise<SubscriptionEntity[]> {
    return this.subscriptionService.getAll();
  }

  @MessagePattern({ role: 'subscription', cmd: 'getClaims' })
  async getSubscriptionClaims(id): Promise<ClaimEntity[]> {
    return this.subscriptionService.getClaims(id);
  }
}
