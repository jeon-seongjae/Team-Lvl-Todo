import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '1,2,3',
    description: '1은 시작전 2는하는중 3은완료',
    required: true,
  })
  public status: number;
}
