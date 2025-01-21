import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

describe('TasksService', () => {
  let service: TasksService;

  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    dueDate: new Date(),
    update: jest.fn().mockResolvedValue(this),
    destroy: jest.fn().mockResolvedValue(undefined),
  };

  const mockTaskModel = {
    create: jest.fn().mockResolvedValue(mockTask),
    findAll: jest.fn().mockResolvedValue([mockTask]),
    findByPk: jest.fn().mockResolvedValue(mockTask),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    mockTask.update.mockResolvedValue(mockTask);

    const task = await service.create({ title: 'New Task' });

    expect(task).toEqual(mockTask);
  });

  it('should find all tasks', async () => {
    const tasks = await service.findAll();

    expect(tasks).toEqual([mockTask]);
  });

  it('should find a task by id', async () => {
    const task = await service.findById(1);

    expect(task).toEqual(mockTask);
  });

  it('should find tasks by completed status', async () => {
    const tasks = await service.findByCompleted(false);

    expect(tasks).toEqual([mockTask]);
  });

  it('should find tasks by due date', async () => {
    const dueDate = new Date();
    const tasks = await service.findByDueDate(dueDate);

    expect(tasks).toEqual([mockTask]);
  });

  it('should update a task by id', async () => {
    const updatedTask = {
      ...mockTask,
      title: 'Updated Task',
      updatedAt: new Date(),
    };

    mockTask.update.mockResolvedValue(updatedTask);

    const task = await service.updateById(1, updatedTask);

    expect(task).toEqual(updatedTask);
    expect(mockTask.update).toHaveBeenCalledWith(updatedTask);
  });

  it('should update task orders', async () => {
    const orders = [{ id: 1, order: 2 }];
    const updatedTask = { ...mockTask, order: 2, updatedAt: new Date() };

    mockTask.update.mockResolvedValue(updatedTask);

    const tasks = await service.updateOrders(orders);

    expect(tasks).toEqual([updatedTask]);
  });

  it('should remove a task by id', async () => {
    await service.remove(1);

    expect(mockTask.destroy).toHaveBeenCalled();
  });

  it('should throw an error if task not created', async () => {
    jest.spyOn(mockTaskModel, 'create').mockResolvedValue(null);

    await expect(service.create({ title: 'New Task' })).rejects.toThrow(
      'Task not created',
    );
  });

  it('should throw an error if task not found', async () => {
    mockTaskModel.findByPk.mockResolvedValue(null);

    await expect(service.findById(2)).rejects.toThrow(
      'Task with id 2 not found',
    );
  });
});
