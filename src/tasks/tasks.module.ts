import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
/*
https://docs.nestjs.com/modules
*/

import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
