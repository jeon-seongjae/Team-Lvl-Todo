import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class SelectTodoDto extends CreateTodoDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
    description: '작성자 고유 아이디',
    required: true,
  })
  public id: number;
}
