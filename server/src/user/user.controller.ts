import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post()
  signUp(@Body() data: CreateUserDto) {
    return this.userService.create(data.email, data.nickname, data.password);
  }

  @ApiOkResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @Get()
  getUserInfo(@Param('nickname') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: '업데이트' })
  @Patch('update')
  update(@Param('nickname') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: '계정 삭제' })
  @Delete('delete')
  remove(@Param('nickname') id: string) {
    return this.userService.remove(+id);
  }

  @ApiOkResponse({
    description: '성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login() {}

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logout() {}
}
