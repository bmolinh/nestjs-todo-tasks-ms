import { Model } from 'sequelize';
import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
} from 'sequelize-typescript';

@Table
export class Task extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AutoIncrement
  @Column
  order: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column({ defaultValue: false })
  completed: boolean;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  tags: string[];

  @Column
  dueDate: Date;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
