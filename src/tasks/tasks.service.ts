import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from '../shared/tag.model';
import { TaskTag } from '../shared/task-tag.model';
import { Task } from '../shared/task.model';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
    @InjectModel(TaskTag)
    private readonly taskTagModel: typeof TaskTag,
  ) {}

  async create(task: CreateTaskDto): Promise<Task> {
    const taskCreated = await this.taskModel.create(
      {
        ...task,
        taskTags: task.tags.map((tag) => ({ tagId: tag.id })),
        dueDate: new Date(task.dueDate),
      },
      {
        include: [TaskTag],
      },
    );

    if (!taskCreated) throw new Error(`Task not created`);

    return taskCreated.update({ order: taskCreated.id });
  }

  async findAll(filter: {
    completed?: boolean;
    dueDate?: Date;
  }): Promise<Task[]> {
    const { completed, dueDate } = filter;

    const completedFilter = completed !== undefined ? { completed } : {};

    const dueDateFilter = dueDate !== undefined ? { dueDate } : {};

    return this.taskModel.findAll({
      where: { ...completedFilter, ...dueDateFilter, deletedAt: null },
      include: [Tag],
    });
  }

  async findById(id: number): Promise<Task> {
    return this.findTaskById(id);
  }

  async updateById(taskId: number, task: UpdateTaskDto): Promise<Task> {
    const taskToUpdate = await this.findTaskById(taskId);

    if (task.tags?.length && task.tags.length > 0) {
      await this.taskTagModel.destroy({ where: { taskId } });

      await Promise.all(
        task.tags.map(async ({ id: tagId }) =>
          this.taskTagModel.create({
            taskId,
            tagId,
          }),
        ),
      );
    }

    return taskToUpdate.update({ ...task, dueDate: new Date(task.dueDate!) });
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
    const task = await this.taskModel.findByPk(id, {
      include: [Tag, TaskTag],
    });

    if (!task)
      throw new NotFoundException('Something bad happened', {
        cause: new Error(),
        description: `Task with id ${id} not found`,
      });

    return task;
  }
}
