import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { Task } from './task.model';

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
            findByCompleted: jest.fn(),
            findByDueDate: jest.fn(),
            create: jest.fn(),
            updateById: jest.fn(),
            updateOrders: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = [];
      jest.spyOn(tasksService, 'findAll').mockResolvedValue(result);

      expect(await tasksController.findAll()).toEqual(result);
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
      };

      jest
        .spyOn(tasksService, 'findById')
        .mockResolvedValue(result as unknown as Task);

      expect(await tasksController.findById(1)).toEqual(result);
    });
  });

  describe('findByCompleted', () => {
    it('should return an array of completed tasks', async () => {
      const result = [];
      jest.spyOn(tasksService, 'findByCompleted').mockResolvedValue(result);

      expect(await tasksController.findByCompleted(true)).toEqual(result);
    });
  });

  describe('findByDueDate', () => {
    it('should return an array of tasks by due date', async () => {
      const result = [];
      jest.spyOn(tasksService, 'findByDueDate').mockResolvedValue(result);

      expect(await tasksController.findByDueDate(new Date())).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create and return a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test',
        description: 'Test',
        dueDate: new Date(),
        tags: [],
      };

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
      };

      jest
        .spyOn(tasksService, 'create')
        .mockResolvedValue(result as unknown as Task);

      expect(await tasksController.create(createTaskDto)).toEqual(result);
    });
  });

  describe('updateById', () => {
    it('should update and return a task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Test',
        description: 'Updated Test',
      };
      const result = {
        id: 1,
        order: 1,
        title: 'Updated Test',
        description: 'Updated Test',
        completed: false,
        tags: [],
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(tasksService, 'updateById')
        .mockResolvedValue(result as unknown as Task);

      expect(await tasksController.updateById(1, updateTaskDto)).toEqual(
        result,
      );
    });
  });

  describe('updateOrders', () => {
    it('should update and return an array of tasks', async () => {
      const orders = [{ id: 1, order: 1 }];
      const result = [];
      jest.spyOn(tasksService, 'updateOrders').mockResolvedValue(result);

      expect(await tasksController.updateOrders(orders)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      jest.spyOn(tasksService, 'remove').mockResolvedValue(undefined);

      expect(await tasksController.remove(1)).toBeUndefined();
    });
  });
});
