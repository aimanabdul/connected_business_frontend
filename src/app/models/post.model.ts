import { User } from "./user.model";
import { Comment } from "./comment.model";
import { Like } from "./like.model";

export class Post {
    constructor(
        public _id?: string,
        public text?: string,
        public companyID?: string,
        public groupID?: string,
        public photo?: String,
        public isPrivate: Boolean=false,
        public author?: User,
        public comments?: Comment[],
        public likes?: Like[],
        public createdAt?: Date,
        public updates?: Date

    ){}
}
