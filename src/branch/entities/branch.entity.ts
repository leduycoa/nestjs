import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import User from '../../users/entities/user.entity';
import Pc from '../../pcs/entities/pcs.entity';
import BuildBranch from 'src/interfaces/branch.interface';
import { Exclude } from 'class-transformer';

@Entity()
class Branch implements BuildBranch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Pc, (pc) => pc.branch)
  pc: Pc[];

  @OneToMany(() => User, (user) => user.branch)
  manager: User[];

  @OneToMany(() => User, (staff) => staff.branch)
  staff: User[];
}

export default Branch;
