import { CreateCustomerProfileHandler } from './create-customer-profile.handler';
import { RemoveClaimHandler } from './remove-claim.handler';
import { RemoveCustomerProfileHandler } from './remove-customer-profile.handler';
import { UpdateCustomerProfileHandler } from './update-customer-profile.handler';

export const CommandHandlers = [
  CreateCustomerProfileHandler,
  RemoveCustomerProfileHandler,
  UpdateCustomerProfileHandler,
  RemoveClaimHandler,
];
