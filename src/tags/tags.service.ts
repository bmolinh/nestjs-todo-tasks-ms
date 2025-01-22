import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from '../shared/tag.model';
import { Task } from '../shared/task.model';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
  ) {}

  create(tag: Partial<Tag>): Promise<Tag> {
    return this.tagModel.create(
      {
        ...tag,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: [Task],
      },
    );
  }

  findAll(): Promise<Tag[]> {
    return this.tagModel.findAll({
      include: [Task],
    });
  }
}
