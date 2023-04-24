import { Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Patch, Query, UsePipes } from '@nestjs/common/decorators';
import { searchTodoDTO } from './DTOs/SearchTodoDTO';
import { TodoServiceV2 } from './todoService';
import { TodoAddDTO } from './DTOs/TodoAddDTO';
import { TodoUpdateDTO } from './DTOs/TodoUpdateDTO';
import { log } from 'console';
import { PaginationDto } from './DTOs/PaginationDTO';

// @Controller({path : 'todo', version : '1'})
// export class TodoController {
//     constructor(private todoService : TodoService){}
//     @Get()
//     getTodos(){
//         return this.todoService.findAll();
//     }

//     @Post('/add')
//     @UsePipes(ValidationPipe)
//     addTodo(@Body() addData : TodoAddDTO){
//         this.todoService.add(addData);
//         return this.todoService.findAll();
//     }
    
//     @Get('/:id')
//     getTodoById(@Param() params){
//         return this.todoService.findById(params.id);
//     }
    
//     @Delete('/:id')
//     deleteTodoById(@Param() params){
//         return this.todoService.deleteById(params.id)
//     }
    
//     @Post('/:id')
//     editTodoById(@Param() params,@Body() updateData : TodoUpdateDTO){ 
//         return this.todoService.updateTodoByIndex(params.id,updateData)
//     }
// }

@Controller({path : 'todo' })
export class TodoControllerV2 {
    constructor(private todoService : TodoServiceV2){}
    // @Get()
    // getTodos(searchTodoDTO){
    //     return this.todoService.findAll();
    // }
    @Get()
    getTodos(@Query() queryParams : searchTodoDTO){
        console.log("here");;
        return this.todoService.findAll(queryParams);
    }

    @Post()
    addTodo(@Body() addData : TodoAddDTO){
        this.todoService.add(addData);
        return "Todo Added ";
    }

    @Post('/:id')
    editTodoById(@Param() params,@Body() updateData : TodoUpdateDTO){ 
        return this.todoService.updateTodo(params.id,updateData)
    }

    @Delete('/:id')
    deleteTodoById(@Param() params){ 
        return this.todoService.deleteTodo(params.id)
    }

    @Patch('/:id')
    restoreTodoById(@Param() params){ 
        return this.todoService.restoreTodo(params.id)
    }

    @Get('/stats')
    todoStats(){
        return this.todoService.statsTodo()
    }

    @Get('/:id')
    getTodoById(@Param() params){
        return this.todoService.todoById(params.id)
    }

    @Get('Pagination')
    async getTodosByPagination(@Query() paginationDto: PaginationDto) {
      return this.todoService.getTodosByPagination(paginationDto);
    }
}

