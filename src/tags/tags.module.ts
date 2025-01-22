import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from '../shared/tag.model';
import { TaskTag } from '../shared/task-tag.model';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [SequelizeModule.forFeature([Tag, TaskTag])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
