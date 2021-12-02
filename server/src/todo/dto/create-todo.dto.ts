import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '오늘 할 일',
    description: '제목',
    required: true,
  })
  public title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '코딩',
    description: '내용',
    required: true,
  })
  public content: string;
}
