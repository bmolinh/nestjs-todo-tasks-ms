import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsArray()
  @IsOptional({ each: true })
  @IsString({ each: true })
  @MaxLength(255, { each: true })
  tags: string[];

  @IsDate()
  dueDate: Date;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
