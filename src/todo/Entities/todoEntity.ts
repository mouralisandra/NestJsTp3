import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { todoDate } from './todoDate';
import { TodoStatusEnum } from '../TodoStatusEnum';
@Entity('todo')
export class TodoEntity extends todoDate{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: TodoStatusEnum,
        default: TodoStatusEnum.waiting
    })
    status : TodoStatusEnum

    constructor(name,desc){
        super()
        this.name = name
        this.description = desc
    }
}