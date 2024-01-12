import { Controller, Get } from '@nestjs/common';
import BranchService from './branch.sevice';

@Controller('branch')
export default class BranchController {
  constructor(private readonly BranchService: BranchService) {}

  @Get()
  getAllPosts() {
    return this.BranchService.getAllBranch();
  }
}
