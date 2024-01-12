import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePcDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  addrIp: string;

  @IsUUID()
  @IsOptional()
  branchId: string;
}

export default UpdatePcDto;
