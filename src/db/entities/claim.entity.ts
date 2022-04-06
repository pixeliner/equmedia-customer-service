import { BaseEntity, JoinTable, Column, ManyToMany, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { SubscriptionEntity } from './subscription.entity';

@Entity()
@Unique(['key'])
export class ClaimEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  key: string;

  @ManyToMany(() => SubscriptionEntity)
  @JoinTable()
  subscriptions: SubscriptionEntity[];

  @ManyToMany(() => CustomerEntity)
  @JoinTable()
  customers: CustomerEntity[];

  @Column()
  expiresAt: Date;
}
