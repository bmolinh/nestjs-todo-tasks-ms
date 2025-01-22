import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { TagsService } from './tags.service';
import { Tag } from '../shared/tag.model';

describe('TagsService', () => {
  let service: TagsService;
  let tagModel: typeof Tag;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getModelToken(Tag),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
    tagModel = module.get<typeof Tag>(getModelToken(Tag));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new tag', async () => {
      const tag: Partial<Tag> = { name: 'Test Tag' };
      const createdTag = {
        ...tag,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Tag;
      jest.spyOn(tagModel, 'create').mockResolvedValue(createdTag);

      const result = await service.create(tag);

      expect(result).toEqual(createdTag);
    });
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const tags: Tag[] = [
        {
          id: 1,
          name: 'Test Tag',
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Tag,
      ];
      jest.spyOn(tagModel, 'findAll').mockResolvedValue(tags);

      const result = await service.findAll();

      expect(result).toEqual(tags);
    });
  });
});
