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
  Options,
  Header,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { undefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { LoginDto } from './dto/login-user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.Guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TokenDto } from 'src/common/dto/token.dto';

@UseInterceptors(undefinedToNullInterceptor)
@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: '회원가입이 완료되었습니다.',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() data: CreateUserDto) {
    return await this.userService.createUser(
      data.email,
      data.nickname,
      data.password,
    );
  }

  @ApiOkResponse({
    type: CreateUserDto,
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@User() user) {
    return await this.userService.userInfo(user.nickname);
  }

  @ApiOkResponse({
    description: '삭제가 완료되었습니다.',
  })
  @ApiOperation({ summary: '계정 삭제' })
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async userWithdrawal(@User() user) {
    return await this.userService.userWithdrawal(user.nickname);
  }

  @ApiOkResponse({
    description: '성공',
    type: TokenDto,
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user, @Body() body: LoginDto) {
    return await user;
  }
}
