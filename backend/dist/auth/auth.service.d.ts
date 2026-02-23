import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from './user.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(authDto: any): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(authDto: any): Promise<{
        access_token: string;
    }>;
}
