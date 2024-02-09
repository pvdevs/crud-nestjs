/*
import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';

describe('TasksController', () => {
  let controller: TasksController;

  const taskMock1: Task = {
    id: 1,
    title: 'titulo mock',
    description: 'lorempisumblabla',
    status: 'pending',
  };
  const taskMock2: Task = {
    id: 2,
    title: 'titulo mock2',
    description: 'lorempisumblabla222',
    status: 'pending2222',
  };

  const allTasksMock: Task[] = [taskMock1, taskMock2];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return a Task not found error', () => {
      controller.findOne(2);
    });
  });
});
*/
