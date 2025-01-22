import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskTag } from '../shared/task-tag.model';
import { Task } from '../shared/task.model';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [SequelizeModule.forFeature([Task, TaskTag])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
