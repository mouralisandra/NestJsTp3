import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Like, Repository } from 'typeorm';
import { searchTodoDTO } from './DTOs/SearchTodoDTO';
import { TodoEntity } from './Entities/todoEntity';
import { TodoAddDTO } from './DTOs/TodoAddDTO';
import { TodoUpdateDTO } from './DTOs/TodoUpdateDTO';
import { TodoModel } from './Entities/TodoModel';
import { TodoStatusEnum } from './TodoStatusEnum';

// @Injectable()
// export class TodoService {
//     constructor(@Inject('randomID') private  randomID, @InjectRepository(TodoEntity)
//     private readonly todoRepository: Repository<TodoEntity>,){}
    
//     private todos = [
//         new TodoModel(1,"Aller au marché","Acheter du pain et du fromage",'actif'),
//         new TodoModel(2,"Aller à la station de service","Faire le Plein",'done'),
//         new TodoModel(3,"Todo 3","Description TODO 3",'waiting')
//     ];

//     add(addData : TodoAddDTO){

//         if(addData.description == undefined || addData.name == undefined){
//             return new BadRequestException()
//         }
        
//         this.todos.push(new TodoModel(this.randomID,addData.name,addData.description,'waiting'))
//     }

//     findAll(): TodoModel[] {
//       return this.todos;
//     }

//     findById(id : string){
//         const result = this.todos.find((e) => e.id == id)
//         if(result == undefined){
//             return new NotFoundException()
//         }
//         return result
//     }

//     deleteById(id : string){
//         const result = this.todos.find((e) => e.id == id)
//         if(result == undefined){
//             return new NotFoundException()
//         }
//         return this.todos = this.todos.filter(e=> e.id = id)
//     }

//     findIndexById(id : string){
//         return this.todos.findIndex((e) => e.id == id);
//     }

//     updateTodoByIndex(id : string , updateData : TodoUpdateDTO){

//         if(updateData.description == undefined && updateData.name == undefined && updateData.statut == undefined ){
//             return new BadRequestException()
//         }

//         const result = this.findIndexById(id);

//         if(result == undefined){
//             return new NotFoundException()
//         }

//         if( updateData.name = undefined){
            
//             this.todos[result].name = updateData.name
//         }
//         if( updateData.description = undefined){
//             this.todos[result].description = updateData.description
//         }
//         if( updateData.statut = undefined){
//             this.todos[result].statut = Object.values(TodoStatusEnum)[ Object.keys(TodoStatusEnum).indexOf(updateData.statut)]
//         }

//         return this.findAll()

//     }

//     async addV2(addData : TodoAddDTO){
//         await this.todoRepository.save(new TodoEntity(addData.name,addData.description));
//     }
// }

@Injectable()
export class TodoServiceV2 {
    constructor(@InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,){}

    async findAll (queryParams? : searchTodoDTO){
        let reponse
        if(queryParams.critere == undefined){
            reponse = await this.todoRepository.find({ where : [{ name : Like("%"+queryParams.critere+"%") }, {description : Like("%"+queryParams.critere+"%")}]})  
        }else if( queryParams.statut == undefined) {
            reponse = await this.todoRepository.find({ where : {status : queryParams.statut}})
        }else{
            reponse = await this.todoRepository.find()
        }
        return reponse;
    }


    async add(addData : TodoAddDTO){
        await this.todoRepository.save(new TodoEntity(addData.name,addData.description));
    }


    async updateTodo(idToFind : string , updateData : TodoUpdateDTO){
        const todoFound = await this.todoRepository.preload({ 
            id : idToFind,
            name : updateData.name,
            description : updateData.description,
            status : updateData.statut
        });

        if( todoFound == undefined)    
            await this.todoRepository.save(todoFound)
        else 
            return " User not found "
    
        return "Updated Successfully"
    }

    async deleteTodo(idToFind : string){
        await this.todoRepository.softDelete(idToFind);

        return "Deleted "
    }

    async restoreTodo(idToFind : string){
        await this.todoRepository.restore(idToFind);

        return "Todo Restored "        
    }

    async statsTodo(){
        const actif = await this.todoRepository.count({ where : { status : TodoStatusEnum.actif}})
        const waiting = await this.todoRepository.count({ where : { status : TodoStatusEnum.waiting}})
        const done = await this.todoRepository.count({ where : { status : TodoStatusEnum.done}})
        return `actifs : ${actif} / waiting : ${waiting} / done : ${done}`
    }

    async todoById(id : string){
        const res = await this.todoRepository.findOne({where : {id : id}})

        if(res === null)
            return "User Not Found "

        return res
    }
}