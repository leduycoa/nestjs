import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BranchService from 'src/branch/branch.sevice';
import Pc from './entities/pcs.entity';
import CreatePcDto from './dto/createPc.dto';
import UpdatePcDto from './dto/updatePc.dto';

@Injectable()
export default class PcsService {
  constructor(
    @InjectRepository(Pc)
    private pcsRepository: Repository<Pc>,
    private readonly branchServices: BranchService,
  ) {}

  async checkPcInBranch(name: string, branchId: string) {
    const exisPcInBranch = await this.pcsRepository.find({
      where: { name, branchId },
    });
    if (exisPcInBranch.length)
      throw new HttpException(
        `pc with with name ${name} has exist in branch ${branchId}`,
        HttpStatus.BAD_REQUEST,
      );
  }

  async create(pcData: CreatePcDto) {
    try {
      const existBranch = await this.branchServices.getBranchById(
        pcData.branchId,
      );
      if (!existBranch.length)
        throw new HttpException(
          `Not found branch with id ${pcData.branchId}`,
          HttpStatus.BAD_REQUEST,
        );
      await this.checkPcInBranch(pcData.name, pcData.branchId);
      const newPc = this.pcsRepository.create(pcData);
      await this.pcsRepository.save(newPc);
      return newPc;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getPcById(id: string) {
    try {
      const pc = await this.pcsRepository.findOne({ where: { id } });
      if (pc) {
        return pc;
      }
      throw new HttpException(
        'Pc with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getAllPcs() {
    return this.pcsRepository.find();
  }

  async deletePc(id: string) {
    try {
      await this.getPcById(id);
      await this.pcsRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updatePc(id: string, updateBody: UpdatePcDto) {
    try {
      const existBranch = await this.branchServices.getBranchById(
        updateBody.branchId,
      );
      if (!existBranch.length)
        throw new HttpException(
          `Not found branch with id ${updateBody.branchId}`,
          HttpStatus.NOT_FOUND,
        );
      await this.checkPcInBranch(updateBody.name, updateBody.branchId);
      await this.getPcById(id);
      return this.pcsRepository.save({ id, ...updateBody });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
