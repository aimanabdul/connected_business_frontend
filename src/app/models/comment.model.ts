import { User } from './user.model';

export class Comment {

    constructor(
        public _id: string="",
        public text: string="",
        public postID: string = "",
        public user: User,
        public userID: string = "", 
    ){}

}

