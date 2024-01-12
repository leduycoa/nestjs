import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BranchService from 'src/branch/branch.sevice';
import PcUsage from './entities/pcUsage.entity';
import CreatePcUsageDto from './dto/createPcUsage.dto';
import UpdatePcUsageDto from './dto/updatePcUsage.dto';


@Injectable()
export default class PcUsageService {
  constructor(
    @InjectRepository(PcUsage)
    private pcUsageRepository: Repository<PcUsage>,
  ) {}

  async create(pcUsageData: CreatePcUsageDto) {
    try {
      const newPc = this.pcUsageRepository.create(pcUsageData);
      await this.pcUsageRepository.save(newPc);
      return newPc;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getPcUsageById(id: string) {
    try {
      const pcUsage = await this.pcUsageRepository.findOne({ where: { id } });
      if (pcUsage) {
        return pcUsage;
      }
      throw new HttpException(
        'PcUsage with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getAllPcUsage() {
    return this.pcUsageRepository.find();
  }

  async deletePcUsage(id: string) {
    try {
      await this.getPcUsageById(id);
      await this.pcUsageRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updatePcUsage(id: string, updateBody: UpdatePcUsageDto) {
    try {
      await this.getPcUsageById(id);
      return this.pcUsageRepository.save({ id, ...updateBody });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
