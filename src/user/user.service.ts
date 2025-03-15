import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity'; // Import User entity

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // Inject the User repository, not the service!
    private userRepository: Repository<User>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(email: string, password: string, role: string): Promise<User> {
    const user = this.userRepository.create({ email, password, role });
    return this.userRepository.save(user);
  }
}
