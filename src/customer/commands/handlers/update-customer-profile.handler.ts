import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { UpdateCustomerProfileCommand } from '../impl';
import { CustomerRepository } from 'src/db/repositories';
import { CustomerEntity } from 'src/db/entities';
import { ErrorValidationService } from 'src/utils/error-validation';

@CommandHandler(UpdateCustomerProfileCommand)
export class UpdateCustomerProfileHandler
  implements ICommandHandler<UpdateCustomerProfileCommand>
{
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
    private readonly errorValidationService: ErrorValidationService,
  ) {}

  async execute(
    command: UpdateCustomerProfileCommand,
  ): Promise<CustomerEntity> {
    const { id, updateCustomerProfileData } = command.updateCustomerProfileDto;
    const { first_name, last_name } = updateCustomerProfileData;

    // TODO: Update subscription claims

    try {
      const updatedCustomer = await this.customerRepository.save({
        id,
        first_name,
        last_name,
      });

      return updatedCustomer;
    } catch (error) {
      const { code, message } = this.errorValidationService.validateDbError(
        error.code,
      );

      throw new RpcException({
        statusCode: code,
        errorStatus: message,
      });
    }
  }
}
