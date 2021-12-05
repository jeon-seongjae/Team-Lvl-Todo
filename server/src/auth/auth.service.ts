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
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const makePaylosd = user.nickname;
      const payload = { makePaylosd };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken: accessToken };
    }
    return null;
  }

  // async validateUser(nickname: string): Promise<any> {
  //   const user = await this.usersRepository.findOne({
  //     where: { nickname },
  //     select: ['id', 'email', 'password', 'nickname'], // 이렇게 하는 이유는 평소에 정보 불러올때 비밀번호 안넘어오게 하려고 entity설정에 select false옵션을 넣어 줬기 때문에
  //   });
  //   if (user) {
  //     const { password, ...userWithoutPassword } = user;
  //     return userWithoutPassword;
  //   }
  //   return null;
  // }
}
