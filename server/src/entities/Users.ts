import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Todo } from './Todo';

@Index('email', ['email'], { unique: true })
@Entity({ schema: 'Todo', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @Column('varchar', { name: 'nickname', unique: true, length: 30 })
  nickname: string;

  @Column('boolean', { name: 'deleted', default: false })
  deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Todo, (todo) => todo.users)
  todo: Todo[];
}
