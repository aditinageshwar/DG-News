import { Document, Types } from 'mongoose';
export declare class Task extends Document {
    title: string;
    description: string;
    status: string;
    userId: Types.ObjectId;
}
export declare const TaskSchema: import("mongoose").Schema<Task, import("mongoose").Model<Task, any, any, any, Document<unknown, any, Task> & Task & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, Document<unknown, {}, import("mongoose").FlatRecord<Task>> & import("mongoose").FlatRecord<Task> & {
    _id: Types.ObjectId;
}>;
