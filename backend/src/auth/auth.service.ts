import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async register(authDto: any) {
    const hashedPassword = await bcrypt.hash(authDto.password, 10);
    const user = new this.userModel({ ...authDto, password: hashedPassword });
    return user.save();
  }

  async login(authDto: any) {
    const user = await this.userModel.findOne({ email: authDto.email });
    if (user && (await bcrypt.compare(authDto.password, user.password))) {
      const payload = { email: user.email, sub: user._id };
      return { access_token: this.jwtService.sign(payload) };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}