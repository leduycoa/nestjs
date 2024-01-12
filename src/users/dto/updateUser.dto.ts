import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Gender, Roles } from '../user.type';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(7)
  password: string;

  @IsString()
  @IsOptional()
  role: Roles;

  @IsString()
  @IsOptional()
  gender: Gender;

  @IsString()
  @IsOptional()
  address: string;

  @IsUUID()
  @IsOptional()
  branchId: string;
}

export default UpdateUserDto;
