import {
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Tag } from './tag.model';
import { TaskTag } from './task-tag.model';

@Table
export class Task extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  order: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column({ defaultValue: false })
  completed: boolean;

  @BelongsToMany(() => Tag, () => TaskTag)
  tags: Tag[];

  @HasMany(() => TaskTag)
  taskTags: TaskTag[];

  @Column
  dueDate: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
