import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { SubscriptionEntity } from "src/db/entities";
import { SubscriptionRepository } from "src/db/repositories";
import { GetSubscriptionsQuery } from "../impl";

@QueryHandler(GetSubscriptionsQuery)
export class GetSubscriptionsHandler implements IQueryHandler<GetSubscriptionsQuery> {
    constructor(
        @InjectRepository(SubscriptionRepository)
        private readonly subscriptionRepository: SubscriptionRepository,
    ) {}

    async execute(query: GetSubscriptionsQuery): Promise<SubscriptionEntity[]> {
        const subscriptions = await this.subscriptionRepository.find();

        return subscriptions;
    }
}