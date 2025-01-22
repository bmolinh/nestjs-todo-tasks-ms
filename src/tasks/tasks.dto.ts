import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UpdateTagDto } from '../shared/tag.dto';

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
  @IsOptional()
  @IsOptional({ each: true })
  tags: UpdateTagDto[];

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
