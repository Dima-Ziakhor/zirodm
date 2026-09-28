import { User } from '@nest/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(user: UserCreateDto): Promise<User> {
    const passwordHash = user.password + '_some_value';
    return this.userRepo.save({
      ...user,
      username: user.firstName + '123',
      passwordHash,
    });
  }

  async deleteUser(id: number) {
    return this.userRepo.delete({ id });
  }
}
