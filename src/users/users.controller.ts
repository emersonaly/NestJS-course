import { Body, Controller, Get, Post, Param, Delete, Put, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get()
  getUsers(){
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findUser(@Param('id') id: string){
    const user = this.usersService.findUserById(Number(id));
    if(!user || typeof user === 'undefined'){
      throw new NotFoundException(`User with ${id} not found`);
    }
    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto){
    return this.usersService.createUser(body);
    }

  @Delete(':id')
  deleteUser(@Param('id') id: string){
    return this.usersService.deleteUserById(Number(id));
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
    return this.usersService.updateUser(Number(id), body);
  }

}

