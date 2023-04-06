import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(user) {
    const newUser = this.userRepo.create(user);
    console.log(user);
    return this.userRepo.save(newUser);
  }

  getUser({ id }) {
    return this.userRepo.findOneBy({ id });
  }

  updateUser({ id }, user) {
    return this.userRepo.update(id, user);
  }

  deleteUser({ id }){
    return this.userRepo.delete(id);
  }
}
