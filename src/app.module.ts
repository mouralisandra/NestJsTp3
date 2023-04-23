import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { User } from './user/entities/user.entity';
import { Cv } from './cv/entities/cv.entity';
import { Skill } from './skill/entities/skill.entity';
import { ConfigModule } from "@nestjs/config";
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/todo.entity';
import { AuthMiddleware } from './Middlewares/auth.middleware';
@Global()
@Module({
  imports: [CvModule,UserModule,SkillModule,ConfigModule.forRoot({
    isGlobal:true,
  }),TypeOrmModule.forRoot(
{
  
  type: 'mysql',
  host: 'localhost',
  port: 3306 ,
  username: 'root',
  password: '',
  database: 'tpnest',
 entities: [User,Cv,Skill,Todo],
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
