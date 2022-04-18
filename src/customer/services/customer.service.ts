import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateCustomerProfileCommand,
  RemoveCustomerProfileCommand,
  UpdateCustomerProfileCommand,
  RemoveClaimCommand,
} from '../commands/impl';
import {
  CreateCustomerProfileDto,
  RemoveCustomerProfileDto,
  GetCustomerProfileDto,
  UpdateCustomerProfileDto,
} from '../dto';
import {
  GetCustomerClaimsQuery,
  GetCustomerProfileQuery,
} from '../queries/impl';
import { ClaimEntity, CustomerEntity } from 'src/db/entities';
import { TextResponseModel } from '../models';

@Injectable()
export class CustomerService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createCustomerProfile(
    createCustomerProfileDto: CreateCustomerProfileDto,
  ): Promise<CustomerEntity> {
    return this.commandBus.execute(
      new CreateCustomerProfileCommand(createCustomerProfileDto),
    );
  }

  async getCustomerClaims(id: string): Promise<ClaimEntity[]> {
    return this.queryBus.execute(new GetCustomerClaimsQuery(id));
  }

  async removeClaim(id: string): Promise<TextResponseModel> {
    return this.commandBus.execute(new RemoveClaimCommand(id));
  }

  async getCustomerProfile(
    getCustomerProfileDto: GetCustomerProfileDto,
  ): Promise<CustomerEntity> {
    return this.queryBus.execute(
      new GetCustomerProfileQuery(getCustomerProfileDto),
    );
  }

  async removeCustomerProfile(
    removeCustomerProfileDto: RemoveCustomerProfileDto,
  ): Promise<boolean> {
    return this.commandBus.execute(
      new RemoveCustomerProfileCommand(removeCustomerProfileDto),
    );
  }

  async updateCustomerProfile(
    updateCustomerProfileDto: UpdateCustomerProfileDto,
  ): Promise<CustomerEntity> {
    return this.commandBus.execute(
      new UpdateCustomerProfileCommand(updateCustomerProfileDto),
    );
  }
}
