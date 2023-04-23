import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './GestionCv/user/user.module';
import { CvModule } from './GestionCv/cv/cv.module';
import { SkillModule } from './GestionCv/skill/skill.module';
import { User } from './GestionCv/user/entities/user.entity';
import { Cv } from './GestionCv/cv/entities/cv.entity';
import { Skill } from './GestionCv/skill/entities/skill.entity';
import { ConfigModule } from "@nestjs/config";
import { TodoModel } from './todo/Entities/todoModel';
import { TodoEntity} from './todo/Entities/todoEntity';
import { AuthMiddleware } from './Middlewares/auth.middleware';
import { TodoModule } from './todo/todoModule';
@Global()
@Module({
  imports: [CvModule,UserModule,TodoModule,SkillModule,ConfigModule.forRoot({
    isGlobal:true,
  }),TypeOrmModule.forRoot(
{
  
  type: 'mysql',
  host: 'localhost',
  port: 3306 ,
  username: 'root',
  password: '',
  database: 'tpnest',
 entities: [User,Cv,Skill,TodoEntity],
 synchronize: true
}
), UserModule, CvModule, SkillModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
 exports: [AppModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('todo');
  }
}
