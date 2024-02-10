import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';

const tasksList: Task[] = [
  new Task({
    id: 111,
    title: 'Take Kalel to Walk',
    description: 'lorem ipsum',
    taskStatus: 'pending',
  }),
  new Task({
    id: 222,
    title: 'Take Oreo to Walk',
    description: 'lorem ipsum',
    taskStatus: 'pending',
  }),
  new Task({
    id: 333,
    title: 'Take Chloe to Walk',
    description: 'lorem ipsum',
    taskStatus: 'pending',
  }),
];

const newTask = new Task({
  id: 123,
  title: 'ok',
  description: 'lorem ipsum',
  taskStatus: 'pending',
});

const updatedTask = new Task({
  id: 123,
  title: 'not ok...',
  description: 'lorem ipsum',
  taskStatus: 'pending',
});

const mockTasksRepository = {
  findOne: jest.fn().mockResolvedValue(tasksList[0]),
  find: jest.fn().mockResolvedValue(tasksList),
  save: jest.fn().mockResolvedValue(newTask),
  update: jest.fn().mockResolvedValue(updatedTask),
  create: jest.fn().mockResolvedValue(newTask),
  delete: jest.fn(),
};

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
    expect(tasksService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a tasks list entity successfully', async () => {
      // Act
      const result = await tasksController.findAll();

      // Assert
      expect(result).toEqual(tasksList);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(tasksService, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(tasksController.findAll()).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create a new task successfully', async () => {
      // Arrange
      const testTask: Task = {
        id: 123,
        title: 'ok',
        description: 'lorem ipsum',
        taskStatus: 'pending',
      };

      // Act
      const result = await tasksController.create(testTask);

      // Assert
      expect(result).toEqual(newTask);
    });
  });

  describe('findOne', () => {
    it('should find the task with matching id successfully', async () => {
      // Act
      const result = await tasksController.findOne(111);

      // Assert
      expect(result).toEqual(tasksList[0]);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(tasksService, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(tasksController.findOne(111)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a task item successfully', async () => {
      // Arrange
      const task: Task = {
        id: 111,
        title: 'Take Kalel to Walk',
        description: 'lorem ipsum',
        taskStatus: 'pending',
      };

      // Act
      const result = await tasksController.update(123, task);

      // Assert
      expect(result).toEqual(tasksList[0]);
    });
  });

  describe('delete', () => {
    it('should remove a task item successfully', async () => {
      // Act
      const result = await tasksController.delete(111);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(tasksService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(tasksController.delete(111)).rejects.toThrow();
    });
  });
});
