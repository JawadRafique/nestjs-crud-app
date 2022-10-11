import { CreateTaskDto } from './dto/create-task.dto';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Body, Param, Delete, Query, Patch } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filteredDto: GetTasksFilterDto): Task[]  {
        /* Checking if the query string has any parameters. If it does, it will return the filtered
        tasks. If not, it will return all tasks. */
        if(Object.keys(filteredDto).length){
            return this.tasksService.getFilteredTask(filteredDto)
        }else{
            this.tasksService.fileReadAndWrite();
            return this.tasksService.getAllTasks();
        }
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): string {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateStatusById(@Param('id') id: string, @Body() updateTaskStatus: UpdateTaskStatusDto): Task {
        const {status} = updateTaskStatus
        return this.tasksService.updateStatusById(id, status);
    }
}
