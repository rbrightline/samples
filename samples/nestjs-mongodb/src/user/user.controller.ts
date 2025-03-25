import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserContnroller {
  constructor(
    @InjectModel(User.name) protected readonly userModel: Model<User>
  ) {}

  @Get()
  async findAll() {
    return await this.userModel.find().exec();
  }

  @Post()
  async create() {
    return await this.userModel.create({
      username: 'john',
      tags: ['developer', 'admin'],
      roles: [
        { name: 'developer', description: 'Developer  role' },
        { name: 'admin', description: 'Admin role' },
      ],
    });
  }
}
