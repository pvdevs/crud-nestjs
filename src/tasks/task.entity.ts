import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  taskStatus: string;

  constructor(task?: Partial<Task>) {
    this.id = task?.id;
    this.title = task?.title;
    this.description = task?.description;
    this.taskStatus = task?.taskStatus;
  }
}
