import { Controller, Get, Param } from '@nestjs/common';

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
    if(this.users.find((user) => user.id === Number(id)) === undefined){
      return {'message': 'User not found'};
    }
    return this.users.find((user) => user.id === Number(id));
  }

}

