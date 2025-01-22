import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTagDto } from '../shared/tag.dto';
import { TagsService } from './tags.service';

@Controller('api/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return await this.tagsService.create(createTagDto);
  }
}
