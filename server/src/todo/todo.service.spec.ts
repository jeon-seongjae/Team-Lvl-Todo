import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from 'src/entities/Todo';
import { Users } from 'src/entities/Users';
import { TodoService } from './todo.service';

class MockTodoRepository {
  #data = [
    { id: 1, title: 'test', content: 'test', status: 2, userId: 1 },
    { id: 2, title: 'test2', content: 'test2', status: 3, userId: 1 },
  ]; //#은 private문법이다
  #data2 = [{ id: 1, nickname: 'je' }];
  findAllTodo(nickname) {
    const user = this.#data2.find((a) => a.nickname === nickname);
    console.log(user);
    if (user) {
      const result = this.#data.find((v) => v.userId === user.id);
      if (result) {
        return result;
      }
      return null;
    }
    return null;
  }
}
class MockUserRepository {}

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useClass: MockTodoRepository,
        },
        {
          provide: getRepositoryToken(Users),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
  it('nickname은 본인이 작성한 모든 게시물을 가져와 야 함', () => {
    expect(service.findAllTodo('je')).resolves.toStrictEqual({
      id: 1,
      title: 'test',
      content: 'test',
      status: 2,
      userId: 1,
    });
  });

  it('nickname은 본인이 작성한 게시물이 없으면 알림 말을 보내야함 ', () => {
    expect(service.findAllTodo('abc')).resolves.toBe(
      '게시물이 존재하지 않습니다.',
    );
  });
});
