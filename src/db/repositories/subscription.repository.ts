import { EntityRepository, Repository } from 'typeorm';
import { SubscriptionEntity } from '../entities';

@EntityRepository(SubscriptionEntity)
export class SubscriptionRepository extends Repository<SubscriptionEntity> {}
