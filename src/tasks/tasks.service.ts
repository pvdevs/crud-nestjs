import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  /// GET all tasks
  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  /// GET one task
  async findOne(id: number): Promise<Task> {
    return await this.tasksRepository.findOne({ where: { id } });
  }

  /// CREATE task
  async create(task: Task): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return await this.tasksRepository.save(newTask);
  }

  /// UPDATE task
  async update(id: number, task: Task): Promise<Task> {
    await this.tasksRepository.update(id, task);
    return await this.tasksRepository.findOne({ where: { id } });
  }

  /// DELETE task
  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
