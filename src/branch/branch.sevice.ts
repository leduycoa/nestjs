import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Branch from './entities/branch.entity';
import FindOneParams from 'src/utils/findOneParams';

@Injectable()
export default class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}
  async initBranch() {
    const branchData = [
      {
        id: '369f8079-3266-4af4-813f-e4e02bbf6680',
        name: 'HN',
        location: 'Ha Noi',
      },
      {
        id: '2fd178bb-c3f5-4bd7-8e98-d26f65f8af02',
        name: 'QN',
        location: 'Quy Nhon',
      },
      {
        id: 'fd7f259d-d39b-4483-adf9-f0f559637d50',
        name: 'HCM',
        location: 'Ho Chi Minh',
      },
    ];
    const newData = this.branchRepository.create(branchData);
    await this.branchRepository.insert(newData);
    return newData;
  }

  async getAllBranch() {
    const existBranch = await this.branchRepository.find({
      relations: ['pc', 'manager', 'staff'],
    });
    if (existBranch.length < 2) {
      return this.initBranch();
    }
    return existBranch;
  }

  async getBranchById(id: string) {
    return this.branchRepository.find({ where: { id } });
  }
}
