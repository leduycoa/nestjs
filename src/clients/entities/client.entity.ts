import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import BuildClient from '../../interfaces/client.interface';
import { Exclude } from 'class-transformer';
import { clientTypes } from '../constants/client.constant';
import Contract from '../../contracts/entities/contract.entity';

@Entity()
export class Client implements BuildClient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: clientTypes,
    default: clientTypes.ORGANIZATION,
  })
  type: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @OneToMany(() => Contract, (contract) => contract.clientId)
  contracts: Contract[];

  @Column()
  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Client;
