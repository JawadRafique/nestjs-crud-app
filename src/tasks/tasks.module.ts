import { ExcelModule } from './../excel/excel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
/*
https://docs.nestjs.com/modules
*/

import { Module } from "@nestjs/common";
import { Task } from './entities/task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule, ExcelModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
