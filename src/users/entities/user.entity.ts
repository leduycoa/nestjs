import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Roles, Gender } from '../user.type';
import BuildUser from '../../interfaces/user.interface';
import Branch from '../../branch/entities/branch.entity';
import PcUsage from '../../pcUsage/entities/pcUsage.entity';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsUUID, isUUID } from 'class-validator';

@Entity()
export class User implements BuildUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    default: 'intern' as Roles,
  })
  role: Roles;

  @Column({
    default: 'none' as Gender,
  })
  gender: Gender;

  @Column({ nullable: true })
  address: string;

  @Column()
  @IsUUID('all')
  branchId: string;

  @Column()
  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @ManyToOne(() => Branch, (branch) => branch.manager)
  @ManyToOne(() => Branch, (branch) => branch.staff)
  branch: Branch;

  @OneToMany(() => PcUsage, (pcUsage) => pcUsage.user)
  pcUsage: PcUsage[];

  isPasswordMatching(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

export default User;
