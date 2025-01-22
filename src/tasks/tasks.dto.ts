import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsDate,
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

  @IsDate()
  dueDate: Date;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
