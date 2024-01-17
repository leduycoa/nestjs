import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import BuildUser from '../../interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { userGenders, userTypes, userStatus } from '../constants/user.constant'
import Contract from '../..//contracts/entities/contract.entity';

@Entity()
export class User implements BuildUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: userTypes,
    default: userTypes.INTERNAL
  })
  userType: string;

  @Column({
    type: 'enum',
    enum: userStatus,
    default: userStatus.ACTIVE
  })
  status: string;
  
  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: userGenders,
  })
  gender: string;
  
  @OneToOne(() => Contract, (contract) => contract.userId)
  contract: Contract;

  @Column()
  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  isPasswordMatching(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

export default User;
