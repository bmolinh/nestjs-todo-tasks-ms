import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '../shared/task.model';
import { TasksController } from './tasks.controller';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            updateOrders: jest.fn(),
            updateById: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = [
        {
          id: 1,
          order: 1,
          title: 'Test',
          description: 'Test',
          completed: false,
          tags: [],
          dueDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      jest
        .spyOn(tasksService, 'findAll')
        .mockResolvedValue(result as unknown as Task[]);

      expect(await tasksController.findAll()).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a single task', async () => {
      const result = {
        id: 1,
        order: 1,
        title: 'Test',
        description: 'Test',
        completed: false,
        tags: [],
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest
        .spyOn(tasksService, 'findById')
        .mockResolvedValue(result as unknown as Task);

      expect(await tasksController.findById(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'Test',
        tags: [],
        dueDate: new Date(),
      };

      const result = { id: 1, ...createTaskDto };

      jest
        .spyOn(tasksService, 'create')
        .mockResolvedValue(result as unknown as Task);

      expect(await tasksController.create(createTaskDto)).toBe(result);
    });
  });

  describe('updateOrders', () => {
    it('should update task orders', async () => {
      const orders = [{ id: 1, order: 1 }];

      const result = [{ id: 1, order: 1 }];

      jest
        .spyOn(tasksService, 'updateOrders')
        .mockResolvedValue(result as unknown as Task[]);

      expect(await tasksController.updateOrders(orders)).toBe(result);
    });
  });

  describe('updateById', () => {
    it('should update a task by id', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };

      const result = { id: 1, ...updateTaskDto };

      jest
        .spyOn(tasksService, 'updateById')
        .mockResolvedValue(result as unknown as Task);

      expect(await tasksController.updateById(1, updateTaskDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a task by id', async () => {
      jest.spyOn(tasksService, 'remove').mockResolvedValue(undefined);

      expect(await tasksController.remove(1)).toBeUndefined();
    });
  });
});
