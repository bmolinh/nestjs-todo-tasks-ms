import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import configuration from '../src/config/configuration';
import { Tag } from '../src/shared/tag.model';
import { TaskTag } from '../src/shared/task-tag.model';
import { Task } from '../src/shared/task.model';
import { TagsController } from '../src/tags/tags.controller';
import { TagsService } from '../src/tags/tags.service';
import { TasksController } from '../src/tasks/tasks.controller';
import { TasksService } from '../src/tasks/tasks.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  const mockTaskData = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    tags: [{ id: 1, name: 'Test Tag' }],
  };

  const mockTask = {
    ...mockTaskData,
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

  const mockTagModel = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          load: [configuration],
        }),
      ],
      controllers: [AppController, TasksController, TagsController],
      providers: [
        AppService,
        TasksService,
        TagsService,
        { provide: getModelToken(Tag), useValue: mockTagModel },
        { provide: getModelToken(Task), useValue: mockTaskModel },
        { provide: getModelToken(TaskTag), useValue: mockTaskTagModel },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('OK');
  });

  it('/api/tags (GET)', () => {
    const tags: Tag[] = [{ id: 1, name: 'Test Tag' } as Tag];

    jest.spyOn(mockTagModel, 'findAll').mockResolvedValue(tags);

    return request(app.getHttpServer())
      .get('/api/tags')
      .expect(200)
      .expect(tags);
  });

  it('/api/tags (POST)', () => {
    const tag: Partial<Tag> = { name: 'Test Tag' };

    const createdTag = { ...tag, id: 1 } as Tag;

    jest.spyOn(mockTagModel, 'create').mockResolvedValue(createdTag);

    return request(app.getHttpServer())
      .post('/api/tags')
      .send({ name: 'New Tag' })
      .expect(201)
      .expect(createdTag);
  });

  it('/api/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/tasks')
      .expect(200)
      .expect([mockTaskData]);
  });

  it('/api/tasks/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/tasks/1')
      .expect(200)
      .expect(mockTaskData);
  });

  it('/api/tasks (POST)', () => {
    const createTaskDto = { title: 'New Task', tags: [{ id: 1 }] };

    mockTask.update.mockResolvedValue(mockTask);

    return request(app.getHttpServer())
      .post('/api/tasks')
      .send(createTaskDto)
      .expect(201)
      .expect(mockTaskData);
  });

  it('/api/tasks/:id (PUT)', () => {
    const updateTaskDto = { title: 'Updated Task', tags: [{ id: 1 }] };
    const updatedTask = {
      ...mockTaskData,
      title: 'Updated Task',
    };

    mockTask.update.mockResolvedValue(updatedTask);

    return request(app.getHttpServer())
      .put('/api/tasks/1')
      .send(updateTaskDto)
      .expect(200)
      .expect(updatedTask);
  });

  it('/api/tasks/orders (PUT)', () => {
    const orders = [{ id: 1, order: 2 }];
    const updatedTask = { ...mockTaskData, order: 2 };

    mockTask.update.mockResolvedValue(updatedTask);

    return request(app.getHttpServer())
      .put('/api/tasks/orders')
      .send(orders)
      .expect(200)
      .expect([updatedTask]);
  });

  it('/api/tasks/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/api/tasks/1').expect(200);
  });
});
