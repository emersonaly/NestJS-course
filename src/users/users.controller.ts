import { Body, Controller, Get, Post, Param, Delete, Put, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

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
  createUser(@Body() body: User){
    this.users.push(body);
    return {
      'message': 'User created successfully',
      'user': body
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
  updateUser(@Param('id') id: string, @Body() body: User){
    const user = this.users.find((user) => user.id === Number(id));
    if(!user || typeof user === 'undefined'){
      return {'message': 'User not found'};
    }
    if(body.name){
      user.name = body.name;
    }
    if(body.email && !body.email.includes('@')){
      throw new UnprocessableEntityException('Invalid email');
    }
    else{
      user.email = body.email;
    }
    if(body.password && body.password.length >= 6){
      user.password = body.password;
    }
    else{
      throw new UnprocessableEntityException('Invalid password');
    }
    return {
      'message': 'User updated successfully',
      'user': user
    }
  }

}

