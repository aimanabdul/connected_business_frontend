import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'src/app/models/comment.model';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(comment: Comment){
    return this.http.post<Comment>("http://localhost:8080/connectedb/comments", comment);
  }

  findAllCommentsByPostId(id: string){
    return this.http.get<Comment[]>("http://localhost:8080/connectedb/comments/post/" + id);
  }

  findCommentById(id: string){
    return this.http.get<Comment>("http://localhost:8080/connectedb/comment/" + id);
  }

  deleteLike(id: string){
    return this.http.delete<Comment>("http://localhost:8080/connectedb/comments/" + id);
  }
}
