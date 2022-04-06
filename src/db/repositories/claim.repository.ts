import { EntityRepository, Repository } from 'typeorm';
import { ClaimEntity } from '../entities';

@EntityRepository(ClaimEntity)
export class ClaimRepository extends Repository<ClaimEntity> {}
