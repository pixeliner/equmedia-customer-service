import { CreateDateColumn, BaseEntity, Column, ManyToMany, JoinTable, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ClaimEntity } from './claim.entity';

@Entity()
export class SubscriptionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  days: number;

  @Column()
  price: number;

  @ManyToMany(() => ClaimEntity)
  @JoinTable()
  claims: ClaimEntity[];

  @CreateDateColumn()
  createdAt!: Date;
}
