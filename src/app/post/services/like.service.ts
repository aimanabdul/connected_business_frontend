import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Like } from 'src/app/models/like.model';

@Injectable()
export class LikeService {

  constructor(private http: HttpClient) { }

  createLike(like: Like){
    return this.http.post<Like>("http://localhost:8080/connectedb/likes", Like);
  }

  findAllLikesByPostId(id: string){
    return this.http.get<Like>("http://localhost:8080/connectedb/likes/post/" + id);
  }

  findLikeById(id: string){
    return this.http.get<Like>("http://localhost:8080/connectedb/likes/" + id);
  }

  deleteLike(id: string){
    return this.http.delete<Like>("http://localhost:8080/connectedb/likes/" + id);
  }
}
