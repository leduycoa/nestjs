import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Generated,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import BuildContract from '../../interfaces/contract.interface';
import { Exclude } from 'class-transformer';
import User from '../../users/entities/user.entity';
import Client from '../../clients/entities/client.entity';

@Entity()
export class Contract implements BuildContract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn()
  @Generated('uuid')
  @ManyToOne(() => Client, (client) => client.contracts, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  clientId: string;

  @JoinColumn()
  @Generated('uuid')
  @OneToOne(() => User, (user) => user.contract, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  userId: string;

  @Column()
  isPrimaryContact: boolean;

  @Column()
  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Contract;
