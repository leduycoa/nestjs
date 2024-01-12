import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import { Gender, Roles } from '../user.type';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @IsString()
  @IsNotEmpty()
  role: Roles;

  @IsString()
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsUUID()
  @IsNotEmpty()
  branchId: string;
}

export default CreateUserDto;
