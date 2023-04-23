import { Cv } from "../../cv/entities/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
   @PrimaryGeneratedColumn("uuid")
  id: string ;
  
  @Column( {unique :true})
  username: string ;
 
  @Column({unique :true})
   email: string ;
  
   @Column()
   password: string ;

   @OneToMany(
    type => Cv,
    (cv)=> cv.user,
    {cascade: true ,
    eager : true , }
   )
   cvs : Cv[] ;
  

  
    
}
