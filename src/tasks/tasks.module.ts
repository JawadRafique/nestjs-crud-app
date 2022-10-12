import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
/*
https://docs.nestjs.com/modules
*/

import { Module } from "@nestjs/common";
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
