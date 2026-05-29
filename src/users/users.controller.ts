import { Body, Controller, Get, Post, Param, Delete, Put, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@mail.com',
      password: '12345',
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@mail.com',
      password: '12345',
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'charlie@mail.com',
      password: '12345',
    },
  ];

  @Get()
  getUsers(){
    return this.users;
  }

  @Get(':id')
  findUser(@Param('id') id: string){
    const user = this.users.find((user) => user.id === Number(id));
    if(!user || typeof user === 'undefined'){
      throw new NotFoundException(`User with ${id} not found`);
    }
    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto){
    const newUser: User = {
      id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
      name: body.name,
      email: body.email,
      password: body.password,
    };
    this.users.push(newUser);
    return {
      'message': 'User created successfully',
      'user': newUser
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string){
    const user = this.users.filter((user) => user.id === Number(id));
    if(!user || typeof user === 'undefined'){
      throw new NotFoundException(`User with ${id} not found`);
    }
    return {
      'message': 'User deleted successfully',
      'user': user
    }
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
    const user = this.users.find((user) => user.id === Number(id));
    if(!user || typeof user === 'undefined'){
      return {'message': 'User not found'};
    }
    return {
      'message': 'User updated successfully',
      'user': user
    }
  }

}

