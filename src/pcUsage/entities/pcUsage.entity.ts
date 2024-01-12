import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Status } from '../pcUsage.type';
import User from '../../users/entities/user.entity';
import Pc from '../../pcs/entities/pcs.entity';
import BuildPcUsage from 'src/interfaces/pcUsage.interface';
import { IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
class PcUsage implements BuildPcUsage{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsUUID()
  userId: string;

  @Column()
  @IsUUID()
  pcId: string;

  @Column({
    default: 'use' as Status,
  })
  status: Status;

  @Column()
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.pcUsage, {
    onDelete: 'SET NULL',
  })
  user: User;

  @ManyToOne(() => Pc, (pc) => pc.pcUsage, {
    onDelete: 'SET NULL',
  })
  pc: Pc;
}

export default PcUsage;
