import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ClaimEntity } from 'src/db/entities';
import { ClaimRepository } from 'src/db/repositories';
import { GetCustomerClaimsQuery } from '../impl';

@QueryHandler(GetCustomerClaimsQuery)
export class GetCustomerClaimsHandler
  implements IQueryHandler<GetCustomerClaimsQuery>
{
  constructor(
    @InjectRepository(ClaimRepository)
    private readonly claimRepository: ClaimRepository,
  ) {}

  async execute(query: GetCustomerClaimsQuery): Promise<ClaimEntity[]> {
    const { id } = query;

    const claims = await this.claimRepository.find({ where: { customer: id } });

    return claims;
  }
}
