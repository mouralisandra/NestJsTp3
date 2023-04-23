import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {
constructor(@InjectRepository(Cv)
  private cvRepository : Repository<Cv> ){}
  
  async create(newCv: CreateCvDto) {
    return await this.cvRepository.save(newCv);;
  }

  async findAll():Promise<Cv[]> {
    return this.cvRepository.find();
  }
  
  async findOne(id: string) :Promise<Cv> {
    const cv=await this.cvRepository.findOne({where: {id}});
    if (!cv){
      throw new NotFoundException(`le cv d'id ${id} n'existe pas` );
   }
   return cv;
  }
  async update(id: string, updatedcv:UpdateCvDto): Promise<Cv> {
    const  newCv = await this.cvRepository.preload({id,...updatedcv,});
    if (newCv) {
      return this.cvRepository.save(newCv);
    } else {
      throw new NotFoundException('cv innexistant');
    }
}
 
  async remove(id: string) :Promise<Cv> {
    const cvToDelete=await this.cvRepository.findOne({where:{id}});
        if(!cvToDelete){
            throw new NotFoundException("Le cv d'id ${id} n'existe pas");
        }
    
            return await this.cvRepository.remove(cvToDelete);
    }
  }

