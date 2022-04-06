export class UpdateCustomerProfileDto {
  id: string;
  updateCustomerProfileData: {
    first_name: string;
    last_name: string;
  };
}
