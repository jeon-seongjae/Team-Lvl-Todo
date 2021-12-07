import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/Todo';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { SelectTodoDto } from './dto/select-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createTodo(
    nickname: string,
    title: string,
    content: string,
    status: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { nickname: nickname, deleted: false },
    });
    if (user) {
      const todo = new Todo();
      todo.title = title;
      todo.content = content;
      todo.status = status;
      todo.userId = user.id;
      await this.todoRepository.save(todo);
      return { message: '게시물 생성이 완료 되었습니다.' };
    }
  }

  async findAllTodo(nickname: string) {
    const user = await this.userRepository.findOne({
      where: { nickname: nickname, deleted: false },
    });
    if (user) {
      const allTodo = await this.todoRepository.find({
        where: { userId: user.id },
      });
      return allTodo;
    }
    throw new UnauthorizedException('게시물이 존재하지 않습니다.');
  }

  async findOneTodo(id: number) {
    const selectTodo = await this.todoRepository.findOne({
      where: { id: id, deleted: false },
    });
    if (selectTodo) {
      return selectTodo;
    }
    throw new UnauthorizedException('존재하지 않는 게시물 입니다.');
  }

  async filterTodo(status: number) {
    const filterList = await this.todoRepository.find({
      where: { status: status, deleted: false },
    });
    if (filterList) {
      if (filterList.length === 0)
        throw new UnauthorizedException(
          `${status} 상태의 게시물이 존재하지 않습니다.`,
        );
      return filterList;
    }
  }

  async todoUpdate(updateTodoDto: SelectTodoDto) {
    const todo = await this.todoRepository.findOne({
      where: { id: updateTodoDto.id, deleted: false },
    });
    if (todo) {
      todo.title = updateTodoDto.title;
      todo.content = updateTodoDto.content;
      todo.status = updateTodoDto.status;

      await this.todoRepository.save(todo);
      return { message: '업데이트가 완료되었습니다.' };
    }
    throw new UnauthorizedException('존재하지 않는 게시물 입니다.');
  }

  async todoDelete(id: number) {
    await this.todoRepository.delete({ id: id });
    return { message: '삭제가 완료되었습니다.' };
  }
}
