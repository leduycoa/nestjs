import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePcDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  addrIp: string;

  @IsUUID()
  @IsNotEmpty()
  branchId: string;
}

export default CreatePcDto;
