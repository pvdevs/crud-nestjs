import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

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
  create: jest.fn().mockReturnValue(newTask),
  delete: jest.fn(),
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
    expect(tasksRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a tasks list entity successfully', async () => {
      // Act
      const result = await tasksService.findAll();

      // Assert
      expect(result).toEqual(tasksList);
      expect(tasksRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(tasksRepository, 'find').mockRejectedValueOnce(new Error());

      // Assert
      expect(tasksService.findAll()).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a task item successfully', async () => {
      // Act
      const result = await tasksService.findOne(111);

      // Assert
      expect(result).toEqual(tasksList[0]);
      expect(tasksRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an not found exception', () => {
      // Arrange
      jest.spyOn(tasksRepository, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(tasksService.findOne(111)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create a new task item successfully', async () => {
      // Arrange
      const task: Task = {
        id: 123,
        title: 'ok',
        description: 'lorem impsum',
        taskStatus: 'pending',
      };

      // Act
      const result = await tasksService.create(task);

      // Assert
      expect(result).toEqual(newTask);
      expect(tasksRepository.create).toHaveBeenCalledTimes(1);
      expect(tasksRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      const task: Task = {
        id: 123,
        title: 'ok',
        description: 'lorem impsum',
        taskStatus: 'pending',
      };
      jest.spyOn(tasksRepository, 'save').mockRejectedValueOnce(new Error());

      // Assert
      expect(tasksService.create(task)).rejects.toThrow();
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
      const result = await tasksService.update(123, task);

      // Assert
      expect(result).toEqual(tasksList[0]);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(tasksRepository, 'findOne').mockRejectedValueOnce(new Error());

      const task: Task = {
        id: 111,
        title: 'Take Kalel to Walk',
        description: 'lorem ipsum',
        taskStatus: 'pending',
      };

      // Assert
      expect(tasksService.update(123, task)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a task item successfully', async () => {
      // Act
      const result = await tasksService.delete(111);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', async () => {
      // Arrange
      jest.spyOn(tasksRepository, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(tasksService.delete(111)).rejects.toThrow();
    });
  });
});
