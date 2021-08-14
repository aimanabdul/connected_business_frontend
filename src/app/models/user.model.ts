import {Role} from './role.model';
import { Position } from './position.model';
import { Group } from './group.model';

export class User {

    constructor(
        public _id: string = "",
        public firstName: string="",
        public lastName: string="",
        public email: string="",
        public username: string="",
        public password: string="",
        public companyID: string="",
        public groups: Group[],
        public roles: Role[],
        public position: Position,
        public accessToken: string="",
    ){}
}
