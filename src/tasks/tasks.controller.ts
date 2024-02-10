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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllTasksSwagger } from './swagger/findall-tasks.swagger';
import { CreateTaskSwagger } from './swagger/create-task.swagger';
import { FindOneTaskSwagger } from './swagger/findone-task.swagger';
import { UpdateTaskSwagger } from './swagger/update-task.swagger';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /// GET all tasks
  @Get()
  @ApiOperation({ summary: 'Listar todas as tasks' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tasks retornada com sucesso',
    type: FindAllTasksSwagger,
    isArray: true,
  })
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  /// GET one task
  @Get(':id')
  @ApiOperation({ summary: 'Mostrar uma task especifica' })
  @ApiResponse({
    status: 200,
    description: 'Dados de uma task retornados com sucesso',
    type: FindOneTaskSwagger,
  })
  @ApiResponse({ status: 404, description: 'Task nao encontrada' })
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
  @ApiResponse({
    status: 201,
    description: 'Nova task criada com sucesso',
    type: CreateTaskSwagger,
  })
  @ApiResponse({ status: 400, description: 'Busca invalida' })
  async create(@Body() task: Task): Promise<Task> {
    return await this.tasksService.create(task);
  }

  /// UPDATE task
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados de uma task' })
  @ApiResponse({
    status: 200,
    description: 'Task atualizada com sucesso',
    type: UpdateTaskSwagger,
  })
  @ApiResponse({ status: 404, description: 'Task nao encontrada' })
  async update(@Param('id') id: number, @Body() task: Task): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  /// DELETE task
  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma task' })
  @ApiResponse({ status: 200, description: 'Task removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Task nao encontrada' })
  async delete(@Param('id') id: number): Promise<void> {
    // handle the error if task not found
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return this.tasksService.delete(id);
  }
}
