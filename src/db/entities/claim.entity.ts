import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { CustomerClaimEntity } from './customer-claim.entity';

@Entity()
@Unique(['key'])
export class ClaimEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  key: string;

  @OneToMany(
    (type) => CustomerClaimEntity,
    (customerClaim) => customerClaim.claim,
  )
  customers: CustomerClaimEntity[];
}
