/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import * as fs from 'fs/promises';

// import {promises} from 'fs'

import { promises as fsPromises } from 'fs';


@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]  {
        return this.tasks;
    }

    getFilteredTask(filteredDto: GetTasksFilterDto): Task[] {
        const {status, search} = filteredDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status === status.toUpperCase())
        }

        if (search) {
            tasks = tasks.filter((task) => {
                if(task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase())){
                    return true;
                }
                return false;
            })
        }

        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find((task) => task.id === id)

        if(!task){
            throw new NotFoundException(`Task with ID ${id} not found`)
        }
        return task
    }

    deleteTaskById(id: string): string {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        return `Task id: ${id} deleted`
    }

    updateStatusById(id: string, status: TaskStatus): Task {
        const task: Task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    fileReadAndWrite(): void {
        fsPromises.appendFile('src/testtext/testtext.txt', '\r\nNodejs - File Write example FS ' + (new Date()));
        console.log("task done")
    }
 }
