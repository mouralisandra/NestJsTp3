import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    username:string;
    
    
    @IsEmail()
    @IsOptional()
    email:string;
    
    
    @IsString()
    @IsOptional()
    password:string;
}