import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async findById(id: number): Promise<Task> {
    return this.findTaskById(id);
  }

  async findByCompleted(completed: boolean): Promise<Task[]> {
    return this.taskModel.findAll({ where: { completed } });
  }

  async findByDueDate(dueDate: Date): Promise<Task[]> {
    return this.taskModel.findAll({ where: { dueDate } });
  }

  async updateById(id: number, task: Partial<Task>): Promise<Task> {
    const taskToUpdate = await this.findTaskById(id);

    return await taskToUpdate.update(task);
  }

  async updateOrders(orders: { id: number; order: number }[]): Promise<Task[]> {
    const tasks = await Promise.all(
      orders.map(async ({ id, order }) => {
        const task = await this.findTaskById(id);

        return task.update({ order });
      }),
    );

    return tasks;
  }

  async remove(id: number): Promise<void> {
    const task = await this.findTaskById(id);

    await task.destroy();
  }

  private async findTaskById(id: number): Promise<Task> {
    const task = await this.taskModel.findByPk(id);

    if (!task) throw new Error(`Task with id ${id} not found`);

    return task;
  }
}
