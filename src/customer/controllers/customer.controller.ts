import { Controller, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CustomerService } from '../services';
import {
  CreateCustomerProfileDto,
  GetCustomerProfileDto,
  RemoveCustomerProfileDto,
  UpdateCustomerProfileDto,
} from '../dto';
import { ClaimEntity, CustomerEntity, SubscriptionEntity } from 'src/db/entities';
import { TextResponseModel } from '../models';
import { SubscriptionService } from '../services/subscription.service';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  @MessagePattern({ role: 'subscription', cmd: 'getAll' })
  async getSubscriptions(): Promise<SubscriptionEntity[]> {
    return this.subscriptionService.getAll();
  }

  @MessagePattern({ role: 'subscription', cmd: 'getClaims' })
  async getSubscriptionClaims(id): Promise<ClaimEntity[]> {
    return this.subscriptionService.getClaims(id);
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({ role: 'customer', cmd: 'create' })
  async createCustomerProfile(
    @Body() createCustomerProfileDto: CreateCustomerProfileDto,
  ): Promise<CustomerEntity> {
    return this.customerService.createCustomerProfile(createCustomerProfileDto);
  }

  @MessagePattern({ role: 'customer', cmd: 'getClaims' })
  async getCustomerClaims(id: string): Promise<ClaimEntity[]> {
    return this.customerService.getCustomerClaims(id);
  }

  @MessagePattern({ role: 'customer', cmd: 'removeClaim' })
  async removeClaim(id: string): Promise<TextResponseModel> {
    return this.customerService.removeClaim(id);
  }

  @MessagePattern({ role: 'customer', cmd: 'get' })
  async getCustomerProfile(
    @Body() getCustomerProfileDto: GetCustomerProfileDto,
  ): Promise<CustomerEntity> {
    return this.customerService.getCustomerProfile(getCustomerProfileDto);
  }

  @MessagePattern({ role: 'customer', cmd: 'remove' })
  async removeCustomerProfile(
    @Body() removeCustomerProfileDto: RemoveCustomerProfileDto,
  ): Promise<Boolean> {
    return this.customerService.removeCustomerProfile(removeCustomerProfileDto);
  }

  @MessagePattern({ role: 'customer', cmd: 'update' })
  async updateCustomerProfile(
    @Body() updateCustomerProfileDto: UpdateCustomerProfileDto,
  ): Promise<CustomerEntity> {
    return this.customerService.updateCustomerProfile(updateCustomerProfileDto);
  }
}
