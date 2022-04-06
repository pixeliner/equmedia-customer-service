import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { CreateCustomerProfileCommand } from '../impl';
import { CustomerRepository } from 'src/db/repositories';
import { CustomerEntity } from 'src/db/entities';
import { ErrorValidationService } from 'src/utils/error-validation';

@CommandHandler(CreateCustomerProfileCommand)
export class CreateCustomerProfileHandler
  implements ICommandHandler<CreateCustomerProfileCommand> {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
    private readonly errorValidationService: ErrorValidationService,
  ) {}

  async execute(
    command: CreateCustomerProfileCommand,
  ): Promise<CustomerEntity> {
    const customer = await this.customerRepository.create({
      ...command.createCustomerProfileDto,
    });

    try {
      await this.customerRepository.save(customer);

      return customer;
    } catch (error) {
      const { code, message } = this.errorValidationService.validateDbError(error.code);

      throw new RpcException({
        statusCode: code,
        errorStatus: message,
      });
    }
  }
}
