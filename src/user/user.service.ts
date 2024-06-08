import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UUID } from 'crypto';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
    private userRepository: Repository<User>,
    ){
        
    }
    findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    
      findOne(id: UUID): Promise<User> {
        return this.userRepository.findOneBy({ id });
      }
    
      create(user: User): Promise<User> {
        return this.userRepository.save(user);
      }
    
      async update(id: UUID, user: User): Promise<User> {
        await this.userRepository.update(id, user);
        return this.findOne(id);
      }
    
      async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
      }
}
