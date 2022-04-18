import { BaseEntity, Column, ManyToOne, Entity, Unique } from 'typeorm';
import { ClaimEntity } from './claim.entity';
import { CustomerEntity } from './customer.entity';

@Entity()
@Unique(['customer', 'claim'])
export class CustomerClaimEntity extends BaseEntity {
  @ManyToOne((type) => CustomerEntity, (customer) => customer.claims)
  customer: string;

  @ManyToOne((type) => ClaimEntity, (claim) => claim.customers)
  claim: string;

  @Column()
  expiresAt: Date;
}
