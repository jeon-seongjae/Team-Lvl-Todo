import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FavoritesTodoDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
    description: '게시글 고유 아이디',
    required: true,
  })
  public id: number;
}
