import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(body: any): Promise<{
        access_token: string;
    }>;
}
