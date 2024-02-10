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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /// GET all tasks
  @Get()
  @ApiOperation({ summary: 'Listar todas as tasks' })
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  /// GET one task
  @Get(':id')
  @ApiOperation({ summary: 'Mostrar uma task especifica' })
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
  @ApiOperation({ summary: 'Adicionar uma nova task' })
  async create(@Body() task: Task): Promise<Task> {
    return await this.tasksService.create(task);
  }

  /// UPDATE task
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados de uma task' })
  async update(@Param('id') id: number, @Body() task: Task): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  /// DELETE task
  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma task' })
  async delete(@Param('id') id: number): Promise<void> {
    // handle the error if task not found
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return this.tasksService.delete(id);
  }
}
