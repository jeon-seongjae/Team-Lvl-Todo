import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('TODO')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({ summary: 'Todo 생성' })
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @ApiOperation({ summary: '전체 Todo 리스트' })
  @Get()
  findAllTodo() {
    return this.todoService.findAll();
  }

  @ApiOperation({ summary: '선택한 Todo 리스트' })
  @Get(':id')
  findOneTodo(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @ApiOperation({ summary: 'Todo 정보 수정' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @ApiOperation({ summary: 'Todo 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
