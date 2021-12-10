import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'nickname'], // 이렇게 하는 이유는 평소에 정보 불러올때 비밀번호 안넘어오게 하려고 entity설정에 select false옵션을 넣어 줬기 때문에
    }); // select 설정을 줘야 비밀번호 가져와진다.
    if (!user) {
      return { message: '존재하지 않는 유저 입니다.' };
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const access = user.nickname;
      const accessPayload = { access };
      const refreshPayload = { refresh: access };
      const accessToken = this.jwtService.sign(accessPayload, {
        expiresIn: '1h',
      });
      const refreshToken = this.jwtService.sign(refreshPayload, {
        expiresIn: '7d',
      });

      user.refreshToken = refreshToken;

      await this.usersRepository.save(user);

      return { accessToken: accessToken, refreshToken: refreshToken };
    }
    return { message: '비밀번호가 일치하지 않습니다.' };
  }
}
