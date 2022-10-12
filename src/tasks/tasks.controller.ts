import { CreateTaskDto } from './dto/create-task.dto';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Body, Param, Delete, Query, Patch } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filteredDto: GetTasksFilterDto):  Promise<Task[]>  {
        /* Checking if the query string has any parameters. If it does, it will return the filtered
        tasks. If not, it will return all tasks. */
        if(Object.keys(filteredDto).length){
            return this.tasksService.getFilteredTask(filteredDto)
        }else{
            return this.tasksService.getAllTasks();
        }
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ):  Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: number):  Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string):  Promise<void> {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateStatusById(@Param('id') id: string, @Body() updateTaskStatus: UpdateTaskStatusDto):  Promise<void> {
        const {status} = updateTaskStatus
        return this.tasksService.updateStatusById(id, status);
    }
}
