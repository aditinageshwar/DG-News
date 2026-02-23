import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(title: string, description: string, userId: string) {
    return new this.taskModel({ title, description, userId }).save();
  }

  async findAll(userId: string, status?: string) {
    const filter: any = { userId };
    if (status && status !== 'All') filter.status = status;
    return this.taskModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async toggleStatus(id: string) {
    const task = await this.taskModel.findById(id);
    task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
    return task.save();
  }
}