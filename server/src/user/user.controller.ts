import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
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
import { User } from 'src/common/decorators/user.decorator';
import { undefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { LoginDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.Guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseInterceptors(undefinedToNullInterceptor)
@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() data: CreateUserDto) {
    await this.userService.createUser(data.email, data.nickname, data.password);
  }

  @ApiOkResponse({
    // type: UserDto,
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getUserInfo(@User() user) {
    return user;
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
    type: LoginDto,
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logout() {}
}
