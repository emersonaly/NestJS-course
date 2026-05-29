import { Injectable, NotFoundException, UnprocessableEntityException, ForbiddenException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';


@Injectable()
export class UsersService {
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

    findAllUsers(){
        return this.users;
    }


    findUserById(id: number){
        const position = this.findOneUser(id);
        const user = this.users[position];
        if (user.id === 1) {
            throw new ForbiddenException(`You can't access this user`);
        }
        return user;
    }

    createUser(body: CreateUserDto){
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

  updateUser(id: number, body: UpdateUserDto){
    const position = this.findOneUser(id);
    const user = this.users[position];
    if (user.id === 1) {
      throw new ForbiddenException(`You can't access this user`);
    }
    const updateUser = {
      ...user,
      ...body,
    }

    this.users[position] = updateUser

    return {
      'message': 'User updated successfully',
      'user': updateUser
    }
  }

  deleteUserById(id: number){
    const position = this.findOneUser(id);
    const user = this.users[position];
    if (user.id === 1) {
      throw new ForbiddenException(`You can't access this user`);
    }
    this.users.splice(position, 1);
    return {
      'message': 'User deleted successfully',
      'user': user
    }
  }

  private findOneUser(id: number){
    const position = this.users.findIndex((user) => user.id === id);
    if(position === -1){
      throw new NotFoundException(`User with ${id} not found`);
    }
    return position;
    }

}
