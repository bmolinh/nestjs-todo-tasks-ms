import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskTag } from '../shared/task-tag.model';
import { Task } from '../shared/task.model';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let taskModel: typeof Task;

  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    tags: [{ id: 1, name: 'Test Tag' }],
    dueDate: new Date(),
    update: jest.fn().mockResolvedValue(this),
    destroy: jest.fn().mockResolvedValue(undefined),
  };

  const mockTaskModel = {
    create: jest.fn().mockResolvedValue(mockTask),
    findAll: jest.fn().mockResolvedValue([mockTask]),
    findByPk: jest.fn().mockResolvedValue(mockTask),
  };

  const mockTaskTagModel = {
    create: jest.fn().mockResolvedValue(undefined),
    destroy: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getModelToken(Task), useValue: mockTaskModel },
        { provide: getModelToken(TaskTag), useValue: mockTaskTagModel },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskModel = module.get<typeof Task>(getModelToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto = { title: 'New Task', tags: [{ id: 1 }] };

      mockTask.update.mockResolvedValue(mockTask);

      const result = await service.create(createTaskDto as any);
      expect(result).toEqual(mockTask);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = await service.findAll({});
      expect(result).toEqual([mockTask]);
    });
  });

  describe('findById', () => {
    it('should return a task by id', async () => {
      const result = await service.findById(1);
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      jest.spyOn(taskModel, 'findByPk').mockResolvedValueOnce(null);

      await expect(service.findById(1)).rejects.toThrow(
        new NotFoundException('Something bad happened', {
          cause: new Error(),
          description: `Task with id 1 not found`,
        }),
      );
    });
  });

  describe('updateById', () => {
    it('should update a task by id', async () => {
      const updateTaskDto = { title: 'Updated Task', tags: [{ id: 1 }] };
      const updatedTask = {
        ...mockTask,
        title: 'Updated Task',
        updatedAt: new Date(),
      };

      mockTask.update.mockResolvedValue(updatedTask);

      const result = await service.updateById(1, updateTaskDto as any);
      expect(result).toEqual(updatedTask);
      expect(mockTask.update).toHaveBeenCalledWith({ ...updateTaskDto });
    });
  });

  describe('updateOrders', () => {
    it('should update task orders', async () => {
      const orders = [{ id: 1, order: 2 }];
      const updatedTask = { ...mockTask, order: 2, updatedAt: new Date() };

      mockTask.update.mockResolvedValue(updatedTask);

      const result = await service.updateOrders(orders);
      expect(result).toEqual([updatedTask]);
      expect(mockTask.update).toHaveBeenCalledWith({ order: 2 });
    });
  });

  describe('remove', () => {
    it('should remove a task by id', async () => {
      await service.remove(1);
      expect(mockTask.destroy).toHaveBeenCalled();
    });
  });
});
