import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { getConnection, IsNull, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { TokenDto } from 'src/common/dto/token.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async createUser(email: string, nickname: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email, deleted: false },
    });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자 입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }

  async userInfo(nickname: string) {
    const user = await this.usersRepository.findOne({
      where: { nickname: nickname, deleted: false },
      select: ['id', 'email', 'nickname'],
    });
    if (user) {
      return user;
    }
    throw new UnauthorizedException('존재하지 않는 사용자 입니다.');
  }

  async userWithdrawal(nickname: string) {
    const user = await this.usersRepository.findOne({
      where: { nickname: nickname, deleted: false },
      select: ['id', 'email', 'password', 'nickname'],
    });
    if (user) {
      user.deleted = true;
      await this.usersRepository.save(user);
      return { message: '삭제가 완료되었습니다.' };
    }
    throw new UnauthorizedException('존재하지 않는 사용자 입니다.');
  }

  async checkRefreshToken(refreshToken: TokenDto) {
    const user = await this.usersRepository.findOne({
      where: { refreshToken: refreshToken, deleted: false },
    });
    if (user) {
      const access = user.nickname;
      const accessPayload = { access };
      const accessToken = this.jwtService.sign(accessPayload, {
        expiresIn: '1h',
      });
      return accessToken;
    }
    return new UnauthorizedException('유효하지 않은 토큰입니다.');
  }
}
