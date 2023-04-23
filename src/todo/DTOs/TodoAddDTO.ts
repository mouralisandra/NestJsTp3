import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ErrorMessages } from '../Entities/ErrorMessages';

export class TodoAddDTO {
    @MinLength(3,{
        message : ErrorMessages.messages.nameMinLength
    })
    @MaxLength(10,{
        message : ErrorMessages.messages.nameMaxLength
    })
    @IsNotEmpty({
        message : ErrorMessages.messages.isEmpty
    })
    name: string;

    
    @MinLength(10 , {
        message : ErrorMessages.messages.descMinLength
    })
    @IsNotEmpty({
        message : ErrorMessages.messages.isEmpty
    })
    description: string;
}