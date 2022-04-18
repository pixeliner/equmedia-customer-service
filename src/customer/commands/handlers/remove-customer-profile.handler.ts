import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { RemoveCustomerProfileCommand } from '../impl';
import { CustomerRepository } from 'src/db/repositories';
import { ErrorValidationService } from 'src/utils/error-validation';

@CommandHandler(RemoveCustomerProfileCommand)
export class RemoveCustomerProfileHandler
  implements ICommandHandler<RemoveCustomerProfileCommand>
{
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
    private readonly errorValidationService: ErrorValidationService,
  ) {}

  async execute(command: RemoveCustomerProfileCommand): Promise<boolean> {
    const { id } = command.removeCustomerProfileDto;
    const customer = await this.customerRepository.findOne(id);

    if (!customer)
      throw new RpcException({
        statusCode: 404,
        errorStatus: `Customer with ID: ${id} not found`,
      });

    try {
      await this.customerRepository.remove(customer);
    } catch (error) {
      const { code, message } = this.errorValidationService.validateDbError(
        error.code,
      );

      throw new RpcException({
        statusCode: code,
        errorStatus: message,
      });
    }

    return true;
  }
}
