import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";
  import Branch from "../../branch/entities/branch.entity";
  import BuildPc from "../../interfaces/pc.interface";
  import PcUsage from "../../pcUsage/entities/pcUsage.entity";
import { IsUUID } from "class-validator";
import { Exclude } from "class-transformer";
  
  @Entity()
  class Pc implements BuildPc {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    addrIp: string;
  
    @Column()
    @IsUUID()
    branchId: string;
  
    @Column()
    @Exclude()
    @CreateDateColumn()
    created_at: Date;
  
    @Column()
    @Exclude()
    @UpdateDateColumn()
    updated_at: Date;
  
    @ManyToOne(() => Branch, (branch) => branch.pc, { onDelete: "SET NULL" })
    branch: Branch;
     
    @OneToMany(() => PcUsage, (pcUsage) => pcUsage.pc)
    pcUsage: PcUsage[];
  }
  
  export default Pc;
  