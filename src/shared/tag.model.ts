import {
  BelongsToMany,
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { TaskTag } from './task-tag.model';
import { Task } from './task.model';

@Table
export class Tag extends Model {
  @Column
  name: string;

  @BelongsToMany(() => Task, () => TaskTag)
  tasks: Task[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
