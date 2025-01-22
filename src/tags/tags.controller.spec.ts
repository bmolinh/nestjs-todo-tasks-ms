import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { CreateTagDto } from '../shared/tag.dto';

describe('TagsController', () => {
  let tagsController: TagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        {
          provide: TagsService,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue([{ name: 'tag1' }, { name: 'tag2' }]),
            create: jest.fn().mockResolvedValue({ id: 1, name: 'tag1' }),
          },
        },
      ],
    }).compile();

    tagsController = module.get<TagsController>(TagsController);
  });

  it('should be defined', () => {
    expect(tagsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const result = await tagsController.findAll();
      expect(result).toEqual([{ name: 'tag1' }, { name: 'tag2' }]);
    });
  });

  describe('create', () => {
    it('should create a new tag', async () => {
      const createTagDto: CreateTagDto = { name: 'tag1' };
      const result = await tagsController.create(createTagDto);
      expect(result).toEqual({ id: 1, name: 'tag1' });
    });
  });
});
