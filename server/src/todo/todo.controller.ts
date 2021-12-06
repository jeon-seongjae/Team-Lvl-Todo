import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { SelectTodoDto } from './dto/select-todo.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('TODO')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOkResponse({
    description: '게시물 생성이 완료 되었습니다.',
  })
  @ApiOperation({ summary: 'Todo 생성' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@User() user, @Body() createTodoData: CreateTodoDto) {
    const { title, content, status } = createTodoData;
    return await this.todoService.createTodo(
      user.nickname,
      title,
      content,
      status,
    );
  }

  @ApiOkResponse({
    description: 'success',
    type: SelectTodoDto,
  })
  @ApiOperation({ summary: '전체 Todo 리스트' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllTodo(@User() user) {
    return await this.todoService.findAllTodo(user.nickname);
  }

  @ApiOkResponse({
    description: 'success',
    type: SelectTodoDto,
  })
  @ApiOperation({ summary: '선택한 Todo 리스트' })
  @UseGuards(JwtAuthGuard)
  @Get('one')
  async findOneTodo(@Query('id') id: number) {
    return await this.todoService.findOneTodo(id);
  }

  @ApiOkResponse({
    description: '수정이 완료 되었습니다.',
  })
  @ApiOperation({ summary: 'Todo 정보 수정' })
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async update(@Body() updateTodoDto: SelectTodoDto) {
    return await this.todoService.todoUpdate(updateTodoDto);
  }

  @ApiOkResponse({
    description: '삭제가 완료 되었습니다.',
  })
  @ApiOperation({ summary: 'Todo 삭제' })
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async remove(@Body('id') id: number) {
    return await this.todoService.todoDelete(id);
  }
}
