import {
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Tag } from './tag.model';
import { Task } from './task.model';

@Table
export class TaskTag extends Model {
  @ForeignKey(() => Task)
  @Column
  taskId: number;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
