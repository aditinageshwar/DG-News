import { Model } from 'mongoose';
import { Task } from './task.schema';
export declare class TasksService {
    private taskModel;
    constructor(taskModel: Model<Task>);
    create(title: string, description: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(userId: string, status?: string): Promise<(import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    toggleStatus(id: string): Promise<import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
