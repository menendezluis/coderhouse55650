import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  users: Array<User>;

  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return createUserDto;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const element = this.users.find((user) => user.id === id);
    return element;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return {
        status: 'error',
        message: 'User not found',
      };
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };

    return {
      status: 'ok',
      data: this.users[userIndex],
    };
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return {
        status: 'error',
        message: 'User not found',
      };
    }
    this.users.splice(userIndex, 1);
    return {
      status: 'ok',
      message: 'User deleted',
    };
  }
}
