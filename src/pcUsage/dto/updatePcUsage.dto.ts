import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { Status } from '../pcUsage.type';

export class UpdatePcUsageDto {
  @IsOptional()
  @IsUUID()
  userId: string;

  @IsUUID()
  @IsOptional()
  pcId: string;

  @IsUUID()
  @IsOptional()
  status: Status;
}

export default UpdatePcUsageDto;
