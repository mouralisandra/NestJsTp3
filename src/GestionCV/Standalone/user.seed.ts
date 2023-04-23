import { NestFactory } from "@nestjs/core";
import { randEmail, randFilePath, randFirstName, randJobTitle, randLastName, randNumber, randPassword, randSkill, randUserName} from "@ngneat/falso";
import { AppModule } from "../../app.module";
import { CvService } from "../cv/cv.service";
import { Cv } from "../cv/entities/cv.entity";
import { Skill } from "../skill/entities/skill.entity";
import { SkillService } from "../skill/skill.service";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import {v4 as uuidV4} from 'uuid';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const userService= app.get(UserService);
    const skillService=app.get(SkillService);
    const cvService=app.get(CvService);
    for (let i = 0; i < 30; i++) {
      const user = new User();
      user.username = randUserName();
      user.email = randEmail();
      user.password=randPassword();
      await userService.create(user);
      }
      for(let i = 0; i < 30; i++){
        const cv=new Cv();
        cv.name=randLastName();
        cv.firstname=randFirstName();  
        cv.age= randNumber({min: 18,max: 70});
        cv.cin= randNumber({min: 10000,max: 99999999})
        cv.job= randJobTitle();
        cv.path=randFilePath();
        await cvService.create(cv);
      }
      for (let i = 0; i < 20; i++) {
        const skill = new Skill();
        skill.designation = randSkill();
        await skillService.create(skill); 
      }
    await app.close();
  }
  bootstrap();




