import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private users = [{ id: 1, name: 'Den', email: 'den@mail.com', password: 'INTERN' }];

  findAll() {
    // findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    //   if (role) {
    //     return this.users.filter(user => user.role === role);
    //   }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { ...createUserDto, id: usersByHighestId[0].id + 1 };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, userUpdateDto: UpdateUserDto) {
    this.users.map(el => (el.id === id ? { ...el, ...userUpdateDto } : el));
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter(el => el.id !== id);
    return removedUser;
  }
}
