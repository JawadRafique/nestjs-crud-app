/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskType, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ){}

    getAllTasks(): Promise<Task[]>{
        return this.taskRepository.find();
    } 

    async getFilteredTask(filteredDto: GetTasksFilterDto):  Promise<Task[]> {
        const {status, search} = filteredDto;
        let tasks = await this.getAllTasks();

        if (status) {
            tasks =  tasks.filter((task) => task.status === status.toUpperCase())
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

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        await this.taskRepository.insert(task)
        return task;
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOneBy({id})

        if(!task){
            throw new NotFoundException(`Task with ID ${id} not found`)
        }
        return task
    }

    async deleteTaskById(id: string): Promise<string> {
        await this.taskRepository.delete(id);
        return `Task id: ${id} deleted`
    }

    async updateStatusById(id: string, status: TaskStatus): Promise<void> {
        await this.taskRepository.update(id,{status})
    }

 }
