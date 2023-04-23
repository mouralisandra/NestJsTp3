import { TodoStatusEnum } from "../TodoStatusEnum"

export class TodoModel {
    id : string
    name : string
    description : string 
    dateDeCreation : string
    statut : TodoStatusEnum
    constructor(id,name,description,statut){
        this.id = id;
        this.name = name;
        this.description = description;
        this.dateDeCreation = Date();
        this.statut = Object.values(TodoStatusEnum)[ Object.keys(TodoStatusEnum).indexOf(statut)];
    }
}