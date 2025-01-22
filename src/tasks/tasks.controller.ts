import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(
    @Query('completed') completed?: boolean,
    @Query('dueDate') dueDate?: Date,
  ) {
    return this.tasksService.findAll({ completed, dueDate });
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.tasksService.findById(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Put('orders')
  async updateOrders(@Body() orders: { id: number; order: number }[]) {
    return await this.tasksService.updateOrders(orders);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.tasksService.updateById(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.tasksService.remove(id);
  }
}
