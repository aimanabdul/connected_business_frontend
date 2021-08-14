import {User} from './user.model';
import {Group} from './group.model';
import {Position} from './position.model';
export class Company {
    constructor(
        public _id: string,
        public name: string,
        public bio: string,
        public creatorID: string,
        public photo: string,
        public fd: FormData,
        public address: string,
        public postalCode: string,
        public city: string,
        public longtitude: string,
        public latitude: string,
        public employees: User[],
        public groups: Group[],
        public positions: Position[],
        public createdAt: Date,
        public updatedAt: Date,

    ){}
}
