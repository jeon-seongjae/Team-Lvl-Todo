import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class TokenDto {
  @IsJWT()
  @ApiProperty({
    required: true,
    example: 'Bearer test',
    description: 'AccessToken',
  })
  accessToken;
}
