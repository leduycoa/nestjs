import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string; 
 
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}

export default UpdatePostDto;
