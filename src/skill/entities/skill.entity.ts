import { Cv } from "../../cv/entities/cv.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('skill')
export class Skill /*extends TimestampEntity*/{
   @PrimaryGeneratedColumn("uuid")
  id: string ;
  
  @Column()
  designation: string ;

  @ManyToMany(
    type => Cv,
    (cv)=> cv.skills,
    
  )
  cvs : Cv[];
}