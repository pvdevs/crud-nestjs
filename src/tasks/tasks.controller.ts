import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /// GET all tasks
  @Get()
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  /// GET one task
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task> {
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new Error('Task not found');
    } else {
      return task;
    }
  }

  /// CREATE task
  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return await this.tasksService.create(task);
  }

  /// UPDATE task
  @Put(':id')
  async update(@Param('id') id: number, @Body() task: Task): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  /// DELETE task
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    // handle the error if task not found
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return this.tasksService.delete(id);
  }
}
