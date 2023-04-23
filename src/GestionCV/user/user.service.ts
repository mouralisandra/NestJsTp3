import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
constructor(@InjectRepository(User)
  private userRepository : Repository<User> ){}
  
  async create(newUser: CreateUserDto):Promise<User> {
    return await this.userRepository.save(newUser);;
  }

  async findAll():Promise<User[]> {
    return await this.userRepository.find();
  }
  
  async findOne(id: string) :Promise<User> {
    const user=await this.userRepository.findOne({where: {id}});
    if (!user){
      throw new NotFoundException(`le user d'id ${id} n'existe pas` );
   }
   return user;
  }

  async update(id: string, updatedUser:UpdateUserDto): Promise<User> {
    const  newUser = await this.userRepository.preload({id,...updatedUser,});
    if (newUser) {
      return this.userRepository.save(newUser);
    } else {
      throw new NotFoundException('user innexistant');
    }
}
 
  async remove(id: string) {
    const res = await this.userRepository.softDelete(id);
      if (res){
          return { message: 'user deleted' };
      }
      else {
          throw new NotFoundException(`le user d'id ${id} n'existe pas` );
      }
  }
}