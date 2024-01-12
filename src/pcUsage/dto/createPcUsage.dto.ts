import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { Status } from '../pcUsage.type';

export class CreatePcUsageDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  pcId: string;

  @IsUUID()
  @IsNotEmpty()
  status: Status;
}

export default CreatePcUsageDto;
