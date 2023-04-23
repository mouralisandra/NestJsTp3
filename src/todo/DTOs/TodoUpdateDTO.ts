import { IsEnum, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { ErrorMessages } from '../Entities/ErrorMessages';
import { TodoStatusEnum } from "../TodoStatusEnum";

export class TodoUpdateDTO {
    @MinLength(3,{
        message : ErrorMessages.messages.nameMinLength
    })
    @MaxLength(10,{
        message : ErrorMessages.messages.nameMaxLength
    })
    @IsOptional({
        message : ErrorMessages.messages.isEmpty
    })
    name: string;
    @MinLength(10 , {
        message : ErrorMessages.messages.descMinLength
    })
    @IsOptional({
        message : ErrorMessages.messages.isEmpty
    })
    description: string;
    @IsEnum(TodoStatusEnum)
    statut : TodoStatusEnum
}