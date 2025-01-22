import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsNotEmpty()
  @IsNumber()
  id?: number;
}
