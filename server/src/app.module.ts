import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import * as ormconfig from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { MorganModule } from 'nest-morgan';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    TodoModule,
    TypeOrmModule.forRoot(ormconfig),
    MorganModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
