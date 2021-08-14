import { User } from "./user.model";

export class Group {

    constructor(
        public _id?: string,
        public name?: string,
        public companyID?: string,
        public members?: User[],
        public photo?: string,
        public themeColor?: string,
        public isPrivate?: boolean,
        public createdAt?: Date,
        public updates?: Date,
    ){}

    
}
