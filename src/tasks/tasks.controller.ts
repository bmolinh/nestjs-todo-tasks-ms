import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('completed')
  findByCompleted(@Query('completed') completed: boolean) {
    return this.tasksService.findByCompleted(completed);
  }

  @Get('due-date')
  findByDueDate(@Query('dueDate') dueDate: Date) {
    return this.tasksService.findByDueDate(dueDate);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.tasksService.findById(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Patch('orders')
  async updateOrders(@Body() orders: { id: number; order: number }[]) {
    return await this.tasksService.updateOrders(orders);
  }

  @Patch(':id')
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
