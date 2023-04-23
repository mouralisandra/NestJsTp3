import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
constructor(@InjectRepository(Skill)
  private skillRepository : Repository<Skill> ){}
  
  async create(newSkill: CreateSkillDto):Promise<Skill> {
    return await this.skillRepository.save(newSkill);;
  }

  async findAll():Promise<Skill[]> {
    return this.skillRepository.find();
  }
  
  async findOne(id: string) :Promise<Skill> {
    const skill=await this.skillRepository.findOne({where: {id}});
    if (!skill){
      throw new NotFoundException(`le skill d'id ${id} n'existe pas` );
   }
   return skill;
  }
  async update(id: string, updatedskill:UpdateSkillDto): Promise<Skill> {
    const  newSkill = await this.skillRepository.preload({id,...updatedskill,});
    if (newSkill) {
      return this.skillRepository.save(newSkill);
    } else {
      throw new NotFoundException('skill innexistant');
    }
}
 
  async remove(id: string) {
    const skillToDelete=await this.skillRepository.findOne({where:{id}});
    if(!skillToDelete){
        throw new NotFoundException("Le skill d'id ${id} n'existe pas");
    }

        return await this.skillRepository.remove(skillToDelete);
}
}
