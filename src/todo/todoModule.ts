import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoControllerV2 } from './todoController';
import { TodoEntity } from './Entities/todoEntity';
import {  TodoServiceV2 } from './todoService';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [TodoEntity]
      )
    ],
  controllers: [TodoControllerV2],
  providers: [TodoServiceV2]
})
export class TodoModule {}
