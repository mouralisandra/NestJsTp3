import { PartialType } from '@nestjs/mapped-types';
import { CreateCvDto } from './create-cv.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCvDto extends PartialType(CreateCvDto) {
    @IsOptional()
    @IsString()
    name:string;
   
    @IsOptional()
    @IsString()
    firstname:string;
   
    @IsOptional()
    @IsNumber()
    age:number;
    
    @IsOptional()
    @IsString()
    path:string;
   
    @IsOptional()
    @IsString()
    job:string;
    
    @IsOptional()
    @IsNumber()
    cin:number;
}
