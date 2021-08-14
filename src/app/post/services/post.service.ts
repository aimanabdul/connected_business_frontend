import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post.model';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post){
    return this.http.post<Post>("http://localhost:8080/connectedb/posts", post);
  }

  findPostById(id: string){
    return this.http.get<Post>("http://localhost:8080/connectedb/posts/" + id)
  }

  findPostsByCompanyId(id: string){
    return this.http.get<Post[]>("http://localhost:8080/connectedb/posts/company/" + id);
  }

  updatePost(id: string, post: Post){
    return this.http.put<Post>("http://localhost:8080/connectedb/posts/" + id , post);
  }

  deletePost(id: string){
    return this.http.delete<Post>("http://localhost:8080/connectedb/posts/" + id)
  }
}
