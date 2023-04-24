import { Entity, SelectQueryBuilder } from "typeorm";

export function paginate<Entity>(
    qb : SelectQueryBuilder<Entity>,
    page=1,
    nb=10): SelectQueryBuilder<Entity>{
        if(nb>0){
            if(!page) page=1;
            qb.skip((page-1)*nb);
            qb.take(nb);
        }
        return qb
    }
