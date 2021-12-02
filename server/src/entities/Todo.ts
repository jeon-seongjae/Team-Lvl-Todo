import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Users } from './Users';

@Entity({ schema: 'Todo', name: 'list' })
export class Todo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 30 })
  title: string;

  @Column('varchar', { name: 'content', length: 100 })
  content: string;

  @Column('varchar', { name: 'status', length: 30 })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.todo, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  }) // 관계 설정 할 때 일단 세부사항은 빼고 생각하자 처음에 다 하고 가려면 너무 복잡하다.
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }]) // 조인 컬럼 둘 중에 하나만 붙이면 되는 데 보통 foreign key가 있는 곳에 쓴다.
  users: Users;
}
